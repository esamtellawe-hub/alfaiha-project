require('dotenv').config({ path: './.env' });
const seedSectors = require('./seeders/sectorSeeder');
const sequelize = require('./config/database');

async function run() {
  await sequelize.authenticate();
  await seedSectors();
  console.log("Done");
  process.exit(0);
}
run();
