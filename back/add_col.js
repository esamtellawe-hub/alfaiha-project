require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = require('./config/database');

async function updateSchema() {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');
    
    // Check if columns exist and add if not
    await sequelize.query('ALTER TABLE `Solutions` ADD COLUMN `standard` VARCHAR(255) NULL;');
    console.log('Added standard column.');
  } catch (error) {
    console.log('Column standard might already exist or error:', error.message);
  }
  
  try {
      await sequelize.query('ALTER TABLE `Solutions` ADD COLUMN `health_and_safety` TEXT NULL;');
      console.log('Added health_and_safety column.');
  } catch(error) {
      console.log('Column health_and_safety might already exist or error:', error.message);
  }
  process.exit();
}

updateSchema();
