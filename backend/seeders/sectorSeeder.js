const Sector = require('../models/Sector');
const SectorArea = require('../models/SectorArea');

const seedSectors = async () => {
    try {
        const sectorCount = await Sector.count();
        if (sectorCount === 0) {
            
            // 1. Residential
            const residential = await Sector.create({
                slug: 'residential',
                name_en: 'Residential',
                name_ar: 'سكني',
                description_en: 'Effective solutions for homes and residential buildings.',
                description_ar: 'حلول فعالة للمنازل والمباني السكنية.',
                icon_name: 'Home' // Just a placeholder for frontend mapping
            });
            
            await SectorArea.bulkCreate([
                { sector_id: residential.id, slug: 'kitchens', name_en: 'Kitchens', name_ar: 'مطابخ' },
                { sector_id: residential.id, slug: 'bathrooms', name_en: 'Bathrooms', name_ar: 'حمامات' },
                { sector_id: residential.id, slug: 'roofs', name_en: 'Roofs', name_ar: 'أسطح' },
                { sector_id: residential.id, slug: 'pools', name_en: 'Swimming Pools', name_ar: 'مسابح' }
            ]);

            // 2. Commercial
            const commercial = await Sector.create({
                slug: 'commercial',
                name_en: 'Commercial',
                name_ar: 'تجاري',
                description_en: 'Durable systems for malls, offices and hotels.',
                description_ar: 'أنظمة متينة للمولات والمكاتب والفنادق.',
                icon_name: 'Building'
            });

            // 3. Infrastructure
            const infrastructure = await Sector.create({
                slug: 'infrastructure',
                name_en: 'Infrastructure',
                name_ar: 'بنية تحتية',
                description_en: 'Heavy-duty solutions for bridges and tunnels.',
                description_ar: 'حلول قوية للجسور والأنفاق.',
                icon_name: 'Bridge'
            });

             // 4. Industrial
             const industrial = await Sector.create({
                slug: 'industrial',
                name_en: 'Industrial',
                name_ar: 'صناعي',
                description_en: 'High-performance systems for factories.',
                description_ar: 'أنظمة عالية الأداء للمصانع.',
                icon_name: 'Factory'
            });

            console.log('✅ Sectors and Areas seeded.');
        } else {
            console.log('ℹ️  Sectors already exist. Skipping seed.');
        }

    } catch (error) {
        console.error('❌ Error seeding Sectors:', error);
    }
};

module.exports = seedSectors;
