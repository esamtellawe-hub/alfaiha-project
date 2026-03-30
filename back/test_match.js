require('dotenv').config({ path: './.env' });
const sequelize = require('./config/database');
const Sector = require('./models/Sector');
const SectorArea = require('./models/SectorArea');
const Solution = require('./models/Solution');
const Category = require('./models/Category');
const AreaSolution = require('./models/AreaSolution');
const { Op } = require('sequelize');
const SECTORS_DATA = require('./seeders/sectorSeeder'); // Just to get the data if exported, else I will copy it

async function testMatching() {
  await sequelize.authenticate();
  
  const keywords = ["Waterproofing", "Concrete Repair", "Concrete Fibers", "Grouts"];
  
  for (const keyword of keywords) {
      console.log(`\nSearching categories for: ${keyword}`);
      const categories = await Category.findAll({
          where: { 
              name_en: { [Op.like]: `%${keyword}%` } 
          }
      });
      console.log(`Found ${categories.length} categories`);
      
      if (categories.length > 0) {
          const catIds = categories.map(c => c.id);
          const solutions = await Solution.findAll({
              where: { category_id: { [Op.in]: catIds } }
          });
          console.log(`Found ${solutions.length} solutions for these categories`);
      }
  }
  process.exit(0);
}
testMatching();
