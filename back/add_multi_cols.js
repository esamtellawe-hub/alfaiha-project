require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = require('./config/database');

async function updateSchema() {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    const columnsToAdd = [
      '`mixing_ratio_en` VARCHAR(255) NULL',
      '`mixing_ratio_ar` VARCHAR(255) NULL',
      '`mixing_ratio_fr` VARCHAR(255) NULL',
      '`coverage_en` VARCHAR(255) NULL',
      '`coverage_ar` VARCHAR(255) NULL',
      '`coverage_fr` VARCHAR(255) NULL',
      '`packaging_en` VARCHAR(255) NULL',
      '`packaging_ar` VARCHAR(255) NULL',
      '`packaging_fr` VARCHAR(255) NULL',
      '`storage_en` VARCHAR(255) NULL',
      '`storage_ar` VARCHAR(255) NULL',
      '`storage_fr` VARCHAR(255) NULL',
      '`standard_en` VARCHAR(255) NULL',
      '`standard_ar` VARCHAR(255) NULL',
      '`standard_fr` VARCHAR(255) NULL',
      '`health_and_safety_en` TEXT NULL',
      '`health_and_safety_ar` TEXT NULL',
      '`health_and_safety_fr` TEXT NULL',
      '`shelf_life_en` VARCHAR(255) NULL',
      '`shelf_life_ar` VARCHAR(255) NULL',
      '`shelf_life_fr` VARCHAR(255) NULL'
    ];

    for (const col of columnsToAdd) {
        try {
            await sequelize.query(`ALTER TABLE \`Solutions\` ADD COLUMN ${col};`);
            console.log(`Added ${col.split(' ')[0]}`);
        } catch (e) {
            console.log(`${col.split(' ')[0]} might already exist or error: ${e.message}`);
        }
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit();
  }
}

updateSchema();
