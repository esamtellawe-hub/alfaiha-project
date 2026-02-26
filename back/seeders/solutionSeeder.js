const Solution = require('../models/Solution');
const Category = require('../models/Category');
const productsData = require('../../front/src/products.json'); 

const seedSolutions = async () => {
  try {
    // Convert object of products to array
    let solutionsList = Object.values(productsData).flat();

    // Fallback/Dummy Data for missing categories (to ensure Sectors page works)
    const requiredCategories = [
        "Waterproofing", "Concrete Repair", "Concrete Fibers", "Grouts", 
        "Sealants", "Protective Coatings", "Plastering", "Surface Treatments", 
        "Flooring", "Concrete Admixtures", "Cement Additives"
    ];

    const existingCategories = new Set(solutionsList.map(p => p.category));
    
    // Add a placeholder product for each missing category
    requiredCategories.forEach(cat => {
        // loose check
        const exists = [...existingCategories].some(c => c && c.toLowerCase().includes(cat.toLowerCase()));
        if (!exists) {
            solutionsList.push({
                id: `placeholder-${cat.toLowerCase().replace(/\s+/g, '-')}`,
                name: `${cat} Solution`,
                category: cat,
                description: `High quality ${cat} solution.`,
                image: "/images/logo.png", // specific placeholder
                uses: ["General construction"],
                advantages: ["High quality", "Durable"],
                standard: "ISO 9001"
            });
        }
    });
    
    // Clear existing data (using delete instead of truncate to avoid FK errors if run independently)
    // if (await Solution.count() > 0) {
    //     await Solution.destroy({ where: {} }); 
    // }
    // if (await Category.count() > 0) {
    //     await Category.destroy({ where: {} });
    // }
    
    // console.log('🧹 Cleared Solutions and Categories.');
    
    // Prevent re-seeding if we already have data
    if (await Solution.count() > 0) {
        console.log('✅ Solutions already seeded. Skipping...');
        return;
    }

    const categoryCache = {}; // Slug -> ID
    const subCategoryCache = {}; // Slug -> ID

    for (const p of solutionsList) {
        if (!p.category) continue;

        // Slug Mapping from Legacy System
        const slugMapping = {
            "Waterproofing Products": "waterproofing",
            "Sealants": "sealants",
            "Concrete Repair": "cementitious-repair",
            "Concrete Repair Products": "cementitious-repair",
            "Protective Coatings": "protective-coating",
            "Flooring Products": "flooring",
            "Tile Adhesives & Grouts": "tile-adhesives",
            "Concrete Admixtures": "concrete-admixtures",
            "Concrete Fibers": "concrete-fibers",
            "Concrete Fiber": "concrete-fibers",
            "Surface Treatments": "surface-treatments",
            "Plastering Textured Products": "decorative",
            "Plastering Textured": "decorative",
            "Products Coatings": "protective-coating",
            "Anchoring and Grouts": "cementitious-repair",
            "Cement additives": "cement-additives"
        };
        
        let parentSlug = slugMapping[p.category];
        if (!parentSlug) {
             parentSlug = p.category.toLowerCase().replace(/\s+/g, '-');
        }

        let parentId = categoryCache[parentSlug];

        // Icon Mapping Helper
        const getIconForCategory = (name) => {
            const n = name.toLowerCase();
            if (n.includes('admixture')) return 'Beaker';
            if (n.includes('additive')) return 'Grid';
            if (n.includes('tile')) return 'Layers';
            if (n.includes('repair')) return 'Hammer';
            if (n.includes('coating')) return 'PaintBucket';
            if (n.includes('waterproof')) return 'Droplets';
            if (n.includes('flooring')) return 'Grid';
            if (n.includes('sealant')) return 'Box';
            if (n.includes('fiber')) return 'Grid';
            if (n.includes('surface')) return 'Layers';
            if (n.includes('decorative')) return 'PaintBucket';
            return 'Box'; // Default
        };

        const categoryDescriptions = {
            "Waterproofing Products": "Advanced waterproofing systems for roofs, basements, and wet areas.",
            "Sealants": "Flexible joint sealants for construction and infrastructure.",
            "Concrete Repair": "High-strength repair mortars and systems for restoring concrete structures.",
            "Concrete Fibers": "Reinforcement fibers to improve concrete durability and crack resistance.",
            "Protective Coatings": "Surface protection against carbonation, chemical attack, and weathering.",
            "Flooring Products": "Durable industrial and decorative flooring systems for various applications.",
            "Surface Treatments": "Curing compounds, hardeners, and surface protection agents.",
            "Anchoring and Grouts": "Precision grouts and anchoring systems for structural fixing.",
            "Tile Adhesives & Grouts": "High-performance adhesives and grouts for tiling systems.",
            "Concrete Admixtures": "Chemical admixtures to enhance concrete properties and performance.",
            "Grinding Aids": "Additives to improve cement grinding efficiency and quality."
        };

        const getDescriptionForCategory = (name) => {
             // Try exact match first
            if (categoryDescriptions[name]) return categoryDescriptions[name];
            
            // Partial match fallback
            const n = name.toLowerCase();
            if (n.includes('waterproof')) return categoryDescriptions["Waterproofing Products"];
            if (n.includes('sealant')) return categoryDescriptions["Sealants"];
            if (n.includes('repair')) return categoryDescriptions["Concrete Repair"];
            if (n.includes('fiber')) return categoryDescriptions["Concrete Fibers"];
            if (n.includes('coating')) return categoryDescriptions["Protective Coatings"];
            if (n.includes('flooring')) return categoryDescriptions["Flooring Products"];
            
            return "Professional construction solutions and systems.";
        };

        if (!parentId) {
            const [parentCat] = await Category.findOrCreate({
                where: { slug: parentSlug },
                defaults: {
                    name_en: p.category,
                    name_ar: p.category, 
                    name_fr: p.category,
                    icon_name: getIconForCategory(p.category),
                    description_en: getDescriptionForCategory(p.category),
                    description_ar: getDescriptionForCategory(p.category),
                    description_fr: getDescriptionForCategory(p.category)
                }
            });
            parentId = parentCat.id;
            categoryCache[parentSlug] = parentId;
        }

        let targetCategoryId = parentId;

        // 2. Resolve Subcategory (if exists)
        if (p.subCategory) {
            const subSlug = `${parentSlug}-${p.subCategory.toLowerCase().replace(/\s+/g, '-')}`;
            let subId = subCategoryCache[subSlug];

            if (!subId) {
                const [subCat] = await Category.findOrCreate({
                    where: { slug: subSlug },
                    defaults: {
                        name_en: p.subCategory,
                        name_ar: p.subCategory,
                        name_fr: p.subCategory,
                        description_en: `Subcategory of ${p.category}`,
                        parent_id: parentId,
                        icon_name: 'CornerDownRight'
                    }
                });
                subId = subCat.id;
                subCategoryCache[subSlug] = subId;
            }
            targetCategoryId = subId;
        }

        // 3. Create Solution (formerly Product)
        await Solution.create({
            slug: p.id || p.name.toLowerCase().replace(/\s+/g, '-'),
            category_id: targetCategoryId,
            image_url: p.image,
            datasheet_url: '/assets/datasheets/sample.pdf',
            is_featured: p.name.includes('A1') || Math.random() < 0.2, 

            name_en: p.name,
            name_ar: p.name, 
            name_fr: p.name,

            description_en: p.description || p.name,
            description_ar: p.description || p.name,
            description_fr: p.description || p.name,

            // JSON Fields
            uses_en: p.uses ? (Array.isArray(p.uses) ? p.uses : [p.uses]) : [],
            uses_ar: p.uses ? (Array.isArray(p.uses) ? p.uses : [p.uses]) : [], 
            
            advantages_en: p.advantages ? (Array.isArray(p.advantages) ? p.advantages : [p.advantages]) : [],
            advantages_ar: p.advantages ? (Array.isArray(p.advantages) ? p.advantages : [p.advantages]) : [],

            // Technical Specs
            mixing_ratio: p.mixing,
            coverage: p.coverage,
            packaging: p.packaging,
            storage: p.storage,
            shelf_life: '12 Months' 
        });
    }

    const sCount = await Solution.count();
    const cCount = await Category.count();
    console.log(`✅ Seeded ${cCount} Categories/Subcategories and ${sCount} Solutions.`);

  } catch (error) {
    console.error('❌ Error seeding Solutions:', error);
  }
};

module.exports = seedSolutions;
