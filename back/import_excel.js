require('dotenv').config();
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const db = require('./config/database');
const Category = require('./models/Category');
const Solution = require('./models/Solution');

// Helper to slugify text
const slugify = (text) => {
    if (!text) return 'unnamed';
    return text.toString().toLowerCase().trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
};

// Helper to parse bullet points or newline-separated lists
const parseList = (text) => {
    if (!text) return [];
    return text.toString()
        .split(/(?:\r?\n|•|\uf0b7|- )/)
        .map(i => i.trim())
        .filter(i => i.length > 0 && i !== '•');
};

// Helper to ensure we don't insert literal "null" or undefined
const cleanValue = (val) => {
    if (val === undefined || val === null) return '';
    return val.toString().trim();
};

async function importExcelData() {
    try {
        await db.authenticate();
        console.log('✅ Database connected.');

        const filePath = path.join(__dirname, 'Products Breakdown (1).xlsx');
        if (!fs.existsSync(filePath)) {
            console.error(`❌ File not found: ${filePath}`);
            return;
        }

        console.log(`📖 Reading file: ${filePath}`);
        const workbook = xlsx.readFile(filePath);

        let totalProductsProcessed = 0;

        // Iterate over all sheets (each sheet is a Category)
        for (const sheetName of workbook.SheetNames) {
            console.log(`\n📂 Processing Category: [${sheetName}]`);
            
            const sheet = workbook.Sheets[sheetName];
            const rows = xlsx.utils.sheet_to_json(sheet, { header: 1, defval: '' });

            if (rows.length < 2) {
                console.log(`⚠️ Sheet [${sheetName}] has no data. Skipping.`);
                continue;
            }

            // Map headers
            const headers = rows[0].map(h => (h || '').toString().trim().toLowerCase());
            const getColIndex = (names) => headers.findIndex(h => names.some(n => h.includes(n)));

            const colMap = {
                name: getColIndex(['product name', 'title']),
                description: getColIndex(['description']),
                uses: getColIndex(['uses']),
                advantages: getColIndex(['advantages']),
                standard: getColIndex(['standarad', 'standard']),
                mixing: getColIndex(['mixing']),
                coverage: getColIndex(['coverage']),
                packaging: getColIndex(['packaging']),
                storage: getColIndex(['storage']),
                health: getColIndex(['health and safety'])
            };

            // 1. Create/Find Category
            const sheetSlug = slugify(sheetName);
            const [category] = await Category.findOrCreate({
                where: { slug: sheetSlug },
                defaults: {
                    name_en: sheetName,
                    name_ar: sheetName,
                    name_fr: sheetName,
                    description_en: `Construction solutions for ${sheetName}.`,
                    description_ar: `حلول إنشائية لـ ${sheetName}.`,
                    description_fr: `Solutions de construction pour ${sheetName}.`,
                    icon_name: 'Box'
                }
            });

            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                if (!row || row.filter(c => c && c.toString().trim()).length < 2) continue;

                const name = cleanValue(row[colMap.name]);
                if (!name) continue;

                const slug = slugify(name);
                const desc = cleanValue(row[colMap.description]);
                const uses = parseList(row[colMap.uses]);
                const advantages = parseList(row[colMap.advantages]);
                
                const techData = {
                    standard: cleanValue(row[colMap.standard]),
                    mixing: cleanValue(row[colMap.mixing]),
                    coverage: cleanValue(row[colMap.coverage]),
                    packaging: cleanValue(row[colMap.packaging]),
                    storage: cleanValue(row[colMap.storage]),
                    health: cleanValue(row[colMap.health])
                };

                try {
                    const [solution, created] = await Solution.findOrCreate({
                        where: { slug: slug },
                        defaults: {
                            name_en: name, name_ar: name, name_fr: name,
                            description_en: desc, description_ar: desc, description_fr: desc,
                            category_id: category.id,
                            uses_en: uses, uses_ar: uses, uses_fr: uses,
                            advantages_en: advantages, advantages_ar: advantages, advantages_fr: advantages,
                            standard_en: techData.standard, standard_ar: techData.standard, standard_fr: techData.standard,
                            mixing_ratio_en: techData.mixing, mixing_ratio_ar: techData.mixing, mixing_ratio_fr: techData.mixing,
                            coverage_en: techData.coverage, coverage_ar: techData.coverage, coverage_fr: techData.coverage,
                            packaging_en: techData.packaging, packaging_ar: techData.packaging, packaging_fr: techData.packaging,
                            storage_en: techData.storage, storage_ar: techData.storage, storage_fr: techData.storage,
                            health_and_safety_en: techData.health, health_and_safety_ar: techData.health, health_and_safety_fr: techData.health,
                            is_featured: false
                        }
                    });

                    if (!created) {
                        await solution.update({
                            name_en: name, // refresh name
                            description_en: desc,
                            category_id: category.id,
                            uses_en: uses,
                            advantages_en: advantages,
                            standard_en: techData.standard,
                            mixing_ratio_en: techData.mixing,
                            coverage_en: techData.coverage,
                            packaging_en: techData.packaging,
                            storage_en: techData.storage,
                            health_and_safety_en: techData.health,
                            // Ensure fallback for French/Arabic if they were null
                            name_ar: solution.name_ar || name,
                            name_fr: solution.name_fr || name,
                            description_ar: solution.description_ar || desc,
                            description_fr: solution.description_fr || desc,
                            uses_ar: (solution.uses_ar && solution.uses_ar.length) ? solution.uses_ar : uses,
                            uses_fr: (solution.uses_fr && solution.uses_fr.length) ? solution.uses_fr : uses,
                            advantages_ar: (solution.advantages_ar && solution.advantages_ar.length) ? solution.advantages_ar : advantages,
                            advantages_fr: (solution.advantages_fr && solution.advantages_fr.length) ? solution.advantages_fr : advantages
                        });
                        console.log(`  🔄 Updated: ${name}`);
                    } else {
                        console.log(`  ✨ Created: ${name}`);
                    }
                    totalProductsProcessed++;
                } catch (err) {
                    console.error(`  ❌ Error on [${name}]:`, err.message);
                }
            }
        }
        console.log(`\n🏁 Done! Processed ${totalProductsProcessed} products.`);
    } catch (error) {
        console.error('❌ Global error:', error);
    } finally {
        process.exit();
    }
}

importExcelData();
