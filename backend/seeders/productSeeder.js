const Product = require('../models/Product');
const Category = require('../models/Category');
const productsData = require('../../front/src/products.json'); 

const seedProducts = async () => {
  try {
    // Convert object of products to array
    const productsList = Object.values(productsData).flat();
    
    // Clear existing data (using delete instead of truncate to avoid FK errors if run independently)
    // In reseed.js flow, tables are already empty, but this is safe for standalone run
    if (await Product.count() > 0) {
        await Product.destroy({ where: {} }); 
    }
    if (await Category.count() > 0) {
        await Category.destroy({ where: {} });
    }
    
    console.log('🧹 Cleared Products and Categories.');

    const categoryCache = {}; // Slug -> ID
    const subCategoryCache = {}; // Slug -> ID

    for (const p of productsList) {
        if (!p.category) continue;

        // 1. Resolve Parent Category
        const parentSlug = p.category.toLowerCase().replace(/\s+/g, '-');
        let parentId = categoryCache[parentSlug];

        if (!parentId) {
            const [parentCat] = await Category.findOrCreate({
                where: { slug: parentSlug },
                defaults: {
                    name_en: p.category,
                    name_ar: p.category, 
                    name_fr: p.category,
                    description_en: `Main category for ${p.category}`,
                    icon_name: 'Layer'
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

        // 3. Create Product
        await Product.create({
            slug: p.id || p.name.toLowerCase().replace(/\s+/g, '-'),
            category_id: targetCategoryId,
            image_url: p.image,
            datasheet_url: '/assets/datasheets/sample.pdf',
            is_featured: p.name.includes('A1') || Math.random() < 0.2, // Randomly feature some if logic not strict

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

    const pCount = await Product.count();
    const cCount = await Category.count();
    console.log(`✅ Seeded ${cCount} Categories/Subcategories and ${pCount} Products.`);

  } catch (error) {
    console.error('❌ Error seeding Products:', error);
  }
};

module.exports = seedProducts;
