const sequelize = require('./config/database');
const seedSuperAdmin = require('./seeders/superAdminSeeder');
const seedSiteSettings = require('./seeders/siteSettingsSeeder');
const seedHomeData = require('./seeders/homeSeeder');
const seedProducts = require('./seeders/productSeeder');
const seedSectors = require('./seeders/sectorSeeder');
const seedContent = require('./seeders/contentSeeder');
const seedMenu = require('./seeders/menuSeeder');

const reseed = async () => {
    try {
        console.log('🔄 Syncing Database (Force)...');
        // Force sync drops tables and recreates them
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        await sequelize.sync({ force: true });
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        console.log('✅ Database Synced.');

        console.log('🌱 Seeding Super Admin...');
        await seedSuperAdmin();

        console.log('🌱 Seeding Site Settings...');
        await seedSiteSettings();

        console.log('🌱 Seeding Home Data...');
        await seedHomeData();

        console.log('🌱 Seeding Products & Categories...');
        await seedProducts();
        
        console.log('🌱 Seeding Sectors...');
        await seedSectors();

        console.log('🌱 Seeding Content...');
        await seedContent();

        console.log('🌱 Seeding Menu...');
        await seedMenu();

        console.log('🎉 Database Reset & Seeding Complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Reseed Failed:', error);
        process.exit(1);
    }
};

reseed();
