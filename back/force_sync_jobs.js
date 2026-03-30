const sequelize = require('./config/database');
const Job = require('./models/Job');
const JobApplication = require('./models/JobApplication');
const setupAssociations = require('./models/associations');

async function sync() {
  try {
    setupAssociations();
    console.log('Syncing Job table...');
    await Job.sync({ alter: true });
    console.log('✅ Job table synced.');
    
    console.log('Syncing JobApplication table...');
    await JobApplication.sync({ alter: true });
    console.log('✅ JobApplication table synced.');
    
    console.log('Testing query...');
    const count = await Job.count();
    console.log('Current jobs count:', count);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Sync failed:', error);
    process.exit(1);
  }
}

sync();
