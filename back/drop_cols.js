require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = require('./config/database');

async function dropLegacyColumns() {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    const columnsToDrop = [
      'mixing_ratio',
      'coverage',
      'packaging',
      'storage',
      'standard',
      'health_and_safety',
      'shelf_life'
    ];

    for (const col of columnsToDrop) {
        try {
            await sequelize.query(`ALTER TABLE \`Solutions\` DROP COLUMN \`${col}\`;`);
            console.log(`Dropped ${col}`);
        } catch (e) {
            console.log(`${col} might already be dropped or error: ${e.message}`);
        }
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit();
  }
}

dropLegacyColumns();
