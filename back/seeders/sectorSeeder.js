const Sector = require('../models/Sector');
const SectorArea = require('../models/SectorArea');
const Solution = require('../models/Solution');
const Category = require('../models/Category');
const AreaSolution = require('../models/AreaSolution');
const { Op } = require('sequelize');

const SECTORS_DATA = [
    {
        slug: "educational",
        title: "Educational",
        icon: "GraduationCap",
        description_en: "Supports schools & universities with durable learning environments.",
        description_ar: "يدعم المدارس والجامعات ببيئات تعليمية متينة.",
        areas: [
            { slug: "sub-structure", title: "Sub-Structure Elements", products: ["Waterproofing", "Concrete Repair", "Concrete Fibers", "Grouts"] },
            { slug: "roofs", title: "Roofs", products: ["Waterproofing", "Sealants", "Protective Coatings", "Plastering"] },
            { slug: "facades", title: "Façades", products: ["Protective Coatings", "Sealants", "Surface Treatments", "Plastering"] },
            { slug: "walls", title: "Walls", products: ["Protective Coatings", "Sealants", "Surface Treatments", "Plastering"] },
            { slug: "floors", title: "Floors", products: ["Tile Adhesives", "Protective Coatings", "Surface Treatments"] },
            { slug: "kitchens", title: "Kitchens & Bathrooms", products: ["Waterproofing", "Tile Adhesives", "Sealants", "Flooring"] },
            { slug: "submerged", title: "Submerged Areas", products: ["Waterproofing", "Tile Adhesives", "Concrete Repair"] },
            { slug: "gyms", title: "Gyms", products: ["Flooring", "Protective Coatings", "Surface Treatments"] },
            { slug: "pools", title: "Swimming Pools", products: ["Waterproofing", "Tile Adhesives", "Sealants", "Protective Coatings"] },
            { slug: "parking", title: "Car Parks", products: ["Protective Coatings", "Concrete Repair", "Concrete Fibers", "Grouts", "Flooring", "Sealants"] },
            { slug: "storage", title: "Storage / Loading Bays", products: ["Concrete Repair", "Concrete Fibers", "Protective Coatings", "Grouts"] }
        ]
    },
    {
        slug: "infrastructure",
        title: "Infrastructure",
        icon: "Car",
        description_en: "High-performance solutions for bridges, tunnels, and roads.",
        description_ar: "حلول عالية الأداء للجسور والأنفاق والطرق.",
        areas: [
            { slug: "bridges", title: "Bridges", products: ["Concrete Repair", "Waterproofing", "Concrete Fiber", "Protective Coatings", "Sealants", "Grouts"] },
            { slug: "tunnels", title: "Tunnels", products: ["Waterproofing", "Concrete Repair", "Concrete Fiber", "Protective Coatings", "Sealants", "Grouts"] },
            { slug: "roadworks", title: "Roadworks", products: ["Protective Coatings", "Sealants", "Surface Treatments", "Concrete Fiber", "Concrete Repair", "Grouts"] },
            { slug: "pipelines", title: "Pipelines", products: ["Waterproofing", "Concrete Repair", "Protective Coatings", "Sealants", "Grouts"] }
        ]
    },
    {
        slug: "power-energy",
        title: "Power & Energy",
        icon: "Zap",
        description_en: "Critical infrastructure protection for power stations & wind farms.",
        description_ar: "حماية البنية التحتية الحيوية لمحطات الطاقة ومزارع الرياح.",
        areas: [
            { slug: "turbine", title: "Turbine Halls", products: ["Protective Coatings", "Surface Treatments", "Flooring", "Sealants"] },
            { slug: "cooling", title: "Cooling Towers", products: ["Waterproofing", "Sealants", "Protective Coatings", "Concrete Repair", "Surface Treatments"] },
            { slug: "substations", title: "Substations", products: ["Sealants", "Flooring", "Protective Coatings", "Concrete Repair", "Surface Treatments"] }
        ]
    },
    {
        slug: "industrial",
        title: "Industrial",
        icon: "Factory",
        description_en: "Heavy-duty solutions for factories, warehouses, and plants.",
        description_ar: "حلول قوية للمصانع والمستودعات والمنشآت.",
        areas: [
            { slug: "production", title: "Production Areas", products: ["Flooring", "Sealants", "Protective Coatings"] },
            { slug: "warehouses", title: "Warehouses", products: ["Flooring", "Concrete Repair", "Sealants"] },
            { slug: "tanks", title: "Tanks & Silos", products: ["Waterproofing", "Concrete Repair", "Protective Coatings"] },
            { slug: "loading", title: "Storage / Loading Bays", products: ["Protective Coatings", "Concrete Repair", "Concrete Fibers", "Grouts"] }
        ]
    },
    {
        slug: "high-rise",
        title: "High Rise",
        icon: "Building2",
        description_en: "Complete building envelope solutions for residential towers.",
        description_ar: "حلول كاملة لغلاف المباني للأبراج السكنية.",
        areas: [
            { slug: "sub-struct", title: "Sub-Structure", products: ["Waterproofing", "Concrete Repair", "Concrete Fibers"] },
            { slug: "roofs", title: "Roofs & Terraces", products: ["Waterproofing", "Sealants", "Protective Coatings"] },
            { slug: "facades", title: "Façades", products: ["Protective Coatings", "Sealants", "Plastering"] },
            { slug: "interiors", title: "Interiors", products: ["Tile Adhesives", "Waterproofing", "Sealants"] }
        ]
    },
    {
        slug: "healthcare",
        title: "Healthcare",
        icon: "Briefcase",
        description_en: "Hygienic solutions for hospitals, clinics, and sterile areas.",
        description_ar: "حلول صحية للمستشفيات والعيادات والمناطق المعقمة.",
        areas: [
            { slug: "operating", title: "Operating Rooms", products: ["Sealants", "Flooring", "Protective Coatings", "Concrete Repair"] },
            { slug: "labs", title: "Laboratories", products: ["Sealants", "Flooring", "Protective Coatings"] },
            { slug: "sterile", title: "Sterile Areas", products: ["Sealants", "Flooring", "Protective Coatings"] }
        ]
    },
    {
        slug: "hospitality",
        title: "Hospitality",
        icon: "LayoutGrid",
        description_en: "Aesthetic & durable solutions for hotels and resorts.",
        description_ar: "حلول جمالية ومتينة للفنادق والمنتجعات.",
        areas: [
            { slug: "lobbies", title: "Lobbies & Ballrooms", products: ["Flooring", "Protective Coatings", "Surface Treatments"] },
            { slug: "pools-spa", title: "Pools & Spas", products: ["Waterproofing", "Tile Adhesives", "Sealants", "Protective Coatings"] },
            { slug: "kids", title: "Kids Play Area", products: ["Flooring", "Protective Coatings", "Surface Treatments"] }
        ]
    },
    {
        slug: "residential",
        title: "Residential",
        icon: "Building2",
        description_en: "Supports apartments and villas with waterproofing systems, concrete repair, and more.",
        description_ar: "يدعم الشقق والفيلات بأنظمة العزل المائي وإصلاح الخرسانة والمزيد.",
        areas: [
            { slug: "sub-structure", title: "Sub-Structure Elements", products: ["Waterproofing", "Concrete Repair", "Concrete Fibers", "Grouts"] },
            { slug: "roofs", title: "Roofs", products: ["Waterproofing", "Sealants", "Protective Coatings", "Plastering"] },
            { slug: "facades", title: "Façades", products: ["Protective Coatings", "Sealants", "Surface Treatments", "Plastering", "Coatings"] },
            { slug: "walls", title: "Walls", products: ["Protective Coatings", "Sealants", "Surface Treatments", "Plastering"] },
            { slug: "floors", title: "Floors", products: ["Tile Adhesives", "Protective Coatings", "Surface Treatments"] },
            { slug: "kitchens", title: "Kitchens & Bathrooms", products: ["Waterproofing", "Tile Adhesives", "Sealants", "Flooring"] },
            { slug: "submerged", title: "Submerged Areas", products: ["Waterproofing", "Tile Adhesives", "Concrete Repair"] },
            { slug: "gyms", title: "Gyms", products: ["Flooring", "Protective Coatings", "Surface Treatments"] },
            { slug: "pools", title: "Swimming Pools", products: ["Waterproofing", "Tile Adhesives", "Sealants", "Protective Coatings"] },
            { slug: "gardens", title: "Gardens", products: ["Sealants", "Flooring", "Protective Coatings", "Concrete Repair", "Waterproofing", "Surface Treatments"] }
        ]
    },
    {
        slug: "commercial-retail",
        title: "Commercial & Retail",
        icon: "Briefcase",
        description_en: "Supports offices, malls, supermarkets, and showrooms.",
        description_ar: "يدعم المكاتب والمولات والسوبر ماركت وصالات العرض.",
        areas: [
            { slug: "sub-structure", title: "Sub-Structure Elements", products: ["Waterproofing", "Concrete Repair", "Concrete Fibers", "Grouts"] },
            { slug: "roofs", title: "Roofs", products: ["Waterproofing", "Sealants", "Protective Coatings", "Plastering"] },
            { slug: "facades", title: "Façades", products: ["Protective Coatings", "Sealants", "Surface Treatments", "Plastering", "Coatings"] },
            { slug: "walls", title: "Walls", products: ["Protective Coatings", "Sealants", "Surface Treatments", "Plastering"] },
            { slug: "floors", title: "Floors", products: ["Tile Adhesives", "Protective Coatings", "Surface Treatments"] },
            { slug: "kitchens", title: "Kitchens & Bathrooms", products: ["Waterproofing", "Tile Adhesives", "Sealants", "Flooring"] },
            { slug: "submerged", title: "Submerged Areas", products: ["Waterproofing", "Tile Adhesives", "Concrete Repair"] },
            { slug: "gyms", title: "Gyms", products: ["Flooring", "Protective Coatings", "Surface Treatments"] },
            { slug: "storage", title: "Storage / Loading Bays", products: ["Protective Coatings", "Concrete Repair", "Concrete Fibers", "Grouts"] },
            { slug: "parking", title: "Car Parks", products: ["Protective Coatings", "Concrete Repair", "Concrete Fibers", "Grouts", "Flooring", "Sealants"] },
            { slug: "food-halls", title: "Food Halls", products: ["Flooring", "Protective Coatings", "Surface Treatments", "Plastering", "Tile Adhesives", "Sealants"] }
        ]
    },
    {
        slug: "correctional-security",
        title: "Correctional & Security",
        icon: "Factory",
        description_en: "Supports jails, military bases, and secure facilities.",
        description_ar: "يدعم السجون والقواعد العسكرية والمنشآت الأمنية.",
        areas: [
             { slug: "sub-structure", title: "Sub-Structure Elements", products: ["Waterproofing", "Concrete Repair", "Concrete Fibers", "Grouts"] },
             { slug: "roofs", title: "Roofs", products: ["Waterproofing", "Sealants", "Protective Coatings", "Plastering"] },
             { slug: "facades", title: "Façades", products: ["Protective Coatings", "Sealants", "Surface Treatments", "Plastering", "Coatings"] },
             { slug: "walls", title: "Walls", products: ["Protective Coatings", "Sealants", "Surface Treatments", "Plastering"] },
             { slug: "floors", title: "Floors", products: ["Tile Adhesives", "Protective Coatings", "Surface Treatments"] },
             { slug: "kitchens", title: "Kitchens & Bathrooms", products: ["Waterproofing", "Tile Adhesives", "Sealants", "Flooring"] },
             { slug: "parking", title: "Car Parks", products: ["Protective Coatings", "Concrete Repair", "Concrete Fibers", "Grouts", "Flooring", "Sealants"] },
             { slug: "secure-perimeters", title: "Secure Perimeters", products: ["Concrete Repair", "Protective Coatings"] },
             { slug: "workshops", title: "Workshops", products: ["Concrete Repair", "Protective Coatings", "Flooring", "Sealants", "Waterproofing", "Grouts", "Tile Adhesives"] }
        ]
    },
    {
        slug: "cultural-entertainment",
        title: "Cultural & Entertainment",
        icon: "LayoutGrid",
        description_en: "Delivers solutions for theaters, museums, arenas, and cinemas.",
        description_ar: "يقدم حلولاً للمسارح والمتاحف والساحات ودور السينما.",
        areas: [
            { slug: "sub-structure", title: "Sub-Structure Elements", products: ["Waterproofing", "Concrete Repair", "Concrete Fibers", "Grouts"] },
            { slug: "roofs", title: "Roofs", products: ["Waterproofing", "Sealants", "Protective Coatings", "Plastering"] },
            { slug: "facades", title: "Façades", products: ["Protective Coatings", "Sealants", "Surface Treatments", "Plastering", "Coatings"] },
            { slug: "walls", title: "Walls", products: ["Protective Coatings", "Sealants", "Surface Treatments", "Plastering"] },
            { slug: "floors", title: "Floors", products: ["Tile Adhesives", "Protective Coatings", "Surface Treatments"] },
            { slug: "kitchens", title: "Kitchens & Bathrooms", products: ["Waterproofing", "Tile Adhesives", "Sealants", "Flooring"] },
            { slug: "submerged", title: "Submerged Areas", products: ["Waterproofing", "Tile Adhesives", "Concrete Repair"] },
            { slug: "storage", title: "Storage / Loading Bays", products: ["Protective Coatings", "Concrete Repair", "Concrete Fibers", "Grouts"] },
            { slug: "parking", title: "Car Parks", products: ["Protective Coatings", "Concrete Repair", "Concrete Fibers", "Grouts", "Flooring", "Sealants"] },
            { slug: "food-halls", title: "Food Halls", products: ["Flooring", "Protective Coatings", "Surface Treatments", "Tile Adhesives", "Sealants"] },
            { slug: "acoustic-halls", title: "Acoustically Treated Halls", products: ["Surface Treatments", "Plastering", "Protective Coatings", "Flooring"] },
            { slug: "climate-controlled", title: "Climate-Controlled Zones", products: ["Surface Treatments", "Protective Coatings"] }
        ]
    },
    {
        slug: "transportation",
        title: "Transportation",
        icon: "Car",
        description_en: "Supports airports, stations, terminals, and ports.",
        description_ar: "يدعم المطارات والمحطات والمحطات والموانئ.",
        areas: [
            { slug: "sub-structure", title: "Sub-Structure Elements", products: ["Waterproofing", "Concrete Repair", "Concrete Fibers", "Grouts"] },
            { slug: "roofs", title: "Roofs", products: ["Waterproofing", "Sealants", "Protective Coatings", "Plastering"] },
            { slug: "facades", title: "Façades", products: ["Protective Coatings", "Sealants", "Surface Treatments", "Plastering", "Coatings"] },
            { slug: "walls", title: "Walls", products: ["Protective Coatings", "Sealants", "Surface Treatments", "Plastering"] },
            { slug: "floors", title: "Floors", products: ["Tile Adhesives", "Protective Coatings", "Surface Treatments"] },
            { slug: "kitchens", title: "Kitchens & Bathrooms", products: ["Waterproofing", "Tile Adhesives", "Sealants", "Flooring"] },
            { slug: "submerged", title: "Submerged Areas", products: ["Waterproofing", "Tile Adhesives", "Concrete Repair"] },
            { slug: "storage", title: "Storage / Loading Bays", products: ["Protective Coatings", "Concrete Repair", "Concrete Fibers", "Grouts"] },
            { slug: "parking", title: "Car Parks", products: ["Protective Coatings", "Concrete Repair", "Concrete Fibers", "Grouts", "Flooring", "Sealants"] },
            { slug: "food-halls", title: "Food Halls", products: ["Flooring", "Protective Coatings", "Surface Treatments", "Tile Adhesives", "Sealants"] },
            { slug: "runways", title: "Runways & Taxiways", products: ["Concrete Repair", "Protective Coatings", "Flooring", "Sealants", "Grouts"] },
            { slug: "control-towers", title: "Control Towers", products: ["Plastering", "Protective Coatings", "Sealants"] }
        ]
    },
    {
        slug: "cement",
        title: "Cement",
        icon: "Factory",
        description_en: "Serves cement plants with cement additives and repair systems.",
        description_ar: "يخدم مصانع الأسمنت بإضافات الأسمنت وأنظمة الإصلاح.",
        areas: [
            { slug: "raw-mill", title: "Raw Material Mill", products: ["Cement additives"] },
            { slug: "silos", title: "Silos", products: ["Concrete Repair", "Concrete Fiber"] },
            { slug: "packing", title: "Packing Facilities", products: ["Concrete Repair", "Concrete Fiber"] },
            { slug: "storage", title: "Storage / Loading Bays", products: ["Protective Coatings", "Concrete Repair", "Concrete Fibers", "Grouts"] },
            { slug: "industrial-floors", title: "Industrial Floors", products: ["Flooring", "Protective Coatings", "Surface Treatments", "Tile Adhesives", "Sealants", "Concrete Repair"] }
        ]
    },
    {
        slug: "concrete",
        title: "Concrete",
        icon: "Building2",
        description_en: "Supports batching plants, precast facilities, and construction.",
        description_ar: "يدعم محطات الخلط، منشآت الصب المسبق، والبناء.",
        areas: [
             { slug: "high-rise", title: "High Rise Buildings", products: ["Concrete Repair", "Concrete Fiber", "Waterproofing", "Surface Treatments", "Plastering", "Protective Coatings", "Flooring", "Sealants", "Grouts", "Tile Adhesives"] },
             { slug: "dams", title: "Dams", products: ["Concrete Repair", "Concrete Fiber"] },
             { slug: "power-plants", title: "Power Plants", products: ["Concrete Repair", "Protective Coatings", "Sealants"] },
             { slug: "residential", title: "Residential Buildings", products: ["Concrete Fiber", "Waterproofing", "Surface Treatments", "Plastering", "Protective Coatings", "Sealants", "Grouts", "Tile Adhesives"] },
             { slug: "roads", title: "Roads & Highways", products: ["Concrete Repair", "Concrete Fiber", "Protective Coatings", "Sealants", "Grouts"] },
             { slug: "bridges", title: "Bridges", products: ["Concrete Repair", "Concrete Fiber", "Protective Coatings", "Sealants", "Grouts"] },
             { slug: "tunnel", title: "Tunnel", products: ["Concrete Repair", "Concrete Fiber", "Protective Coatings", "Sealants", "Grouts"] },
             { slug: "ready-mix", title: "Ready-Mix Concrete", products: ["Concrete Admixtures"] },
             { slug: "precast", title: "Precast", products: ["Concrete Repair", "Concrete Fiber", "Protective Coatings", "Sealants"] }
        ]
    },
    {
        slug: "marine",
        title: "Marine",
        icon: "Factory", // Mapped from default
        description_en: "Delivers marine-grade solutions for quays, jetties, and docks.",
        description_ar: "يقدم حلولاً بحرية للأرصفة والجسور والأحواض.",
        areas: [
            { slug: "marine-piling", title: "Marine Piling", products: ["Protective Coatings", "Concrete Repair", "Concrete Fiber", "Grouts", "Waterproofing", "Surface Treatments"] },
            { slug: "quay-walls", title: "Quay Walls", products: ["Sealants", "Protective Coatings", "Concrete Repair", "Concrete Fiber", "Grouts", "Waterproofing", "Surface Treatments"] },
            { slug: "slipways", title: "Slipways", products: ["Sealants", "Protective Coatings", "Concrete Repair", "Concrete Fiber", "Grouts", "Waterproofing", "Surface Treatments"] }
        ]
    },
    {
         slug: "oil-gas",
         title: "Oil & Gas",
         icon: "Zap",
         description_en: "Supports refineries, pipelines, and storage tanks.",
         description_ar: "يدعم المصافي وخطوط الأنابيب وخزانات التخزين.",
         areas: [
             { slug: "tanks", title: "Tanks", products: ["Waterproofing", "Concrete Repair", "Protective Coatings", "Sealants", "Surface Treatments", "Concrete Fiber"] },
             { slug: "pipelines", title: "Pipelines", products: ["Waterproofing", "Concrete Repair", "Protective Coatings", "Sealants", "Grouts"] },
             { slug: "offshore", title: "Offshore Platforms", products: ["Surface Treatments", "Concrete Fiber", "Concrete Repair", "Protective Coatings", "Sealants", "Grouts", "Waterproofing"] }
         ]
    },
    {
        slug: "water",
        title: "Water",
        icon: "Factory",
        description_en: "Serves treatment plants, reservoirs, and pipelines.",
        description_ar: "يخدم محطات المعالجة والخزانات وخطوط الأنابيب.",
        areas: [
            { slug: "pipelines", title: "Pipelines", products: ["Waterproofing", "Concrete Repair", "Protective Coatings", "Sealants", "Grouts"] },
            { slug: "treatment-tanks", title: "Treatment Tanks", products: ["Waterproofing", "Concrete Repair", "Protective Coatings", "Sealants", "Surface Treatments"] },
            { slug: "reservoirs", title: "Reservoirs", products: ["Waterproofing", "Concrete Repair", "Protective Coatings", "Sealants", "Surface Treatments", "Concrete Fiber"] },
            { slug: "septic-tanks", title: "Septic Tanks", products: ["Waterproofing", "Concrete Repair", "Protective Coatings", "Sealants", "Surface Treatments"] }
        ]
    }
];

const seedSectors = async () => {
    try {
        console.log('🌱 Seeding Sectors...');

        // Clear existing Sectors and Areas (cascade will handle areas, but best to be safe)
        // Note: foreign keys might prevent simple truncate. We are in a reseed script, usually we clean up everything.
        // Let's destroy all first to ensure clean slate if re-running.
        await AreaSolution.destroy({ where: {} });
        await SectorArea.destroy({ where: {} });
        await Sector.destroy({ where: {} });

        for (const data of SECTORS_DATA) {
            // 1. Create Sector
            const sector = await Sector.create({
                slug: data.slug,
                name_en: data.title,
                name_ar: data.title, // Simplified for now, in real app needs proper translation
                description_en: data.description_en,
                description_ar: data.description_ar,
                icon_name: data.icon
            });

            // 2. Create Areas and Link Solutions
            for (const areaData of data.areas) {
                const area = await SectorArea.create({
                    sector_id: sector.id,
                    slug: areaData.slug,
                    name_en: areaData.title,
                    name_ar: areaData.title, // Simplified
                    description_en: '',
                    description_ar: ''
                });

                // 3. Link Solutions based on product keywords (Categories)
                // In Sectors.jsx these map to Categories.
                // We will find ALL *Solutions* that belong to a *Category* matching these keywords.
                
                const seenSolutionsData = new Set();
                
                for (const keyword of areaData.products) {
                    // Try to match partial category name
                    const categories = await Category.findAll({
                         where: { 
                             name_en: { [Op.like]: `%${keyword}%` } 
                         },
                         include: [{ model: Category, as: 'children' }]
                    });

                    if (categories.length > 0) {
                        let catIds = categories.map(c => c.id);
                        
                        // Also include children IDs (subcategories)
                        categories.forEach(c => {
                            if (c.children && c.children.length > 0) {
                                catIds = [...catIds, ...c.children.map(child => child.id)];
                            }
                        });

                        // Find all solutions in these categories (parent or children)
                        const solutions = await Solution.findAll({
                            where: { category_id: { [Op.in]: catIds } }
                        });
                        
                        // Use direct create to avoid association issues
                        if (solutions.length > 0) {
                             const bulkData = [];
                             solutions.forEach(sol => {
                                 const uniqueKey = `${area.id}-${sol.id}`;
                                 if (!seenSolutionsData.has(uniqueKey)) {
                                     bulkData.push({
                                         sector_area_id: area.id,
                                         solution_id: sol.id
                                     });
                                     seenSolutionsData.add(uniqueKey);
                                 }
                             });

                             if (bulkData.length > 0) {
                                 await AreaSolution.bulkCreate(bulkData);
                             }
                        }
                    }
                }
            }
        }

        console.log('✅ Sectors, Areas, and Solution Links seeded.');

    } catch (error) {
        console.error('❌ Error seeding Sectors:', error);
    }
};

module.exports = seedSectors;
