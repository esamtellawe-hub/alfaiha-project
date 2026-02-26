require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const settingsRoutes = require('./routes/settings');
const homeRoutes = require('./routes/home');
const productRoutes = require('./routes/solutions');
const contentRoutes = require('./routes/content');
const menuRoutes = require('./routes/menu');
const adminRoutes = require('./routes/admin');
const setupAssociations = require('./models/associations');
const seedSuperAdmin = require('./seeders/superAdminSeeder');
const seedSiteSettings = require('./seeders/siteSettingsSeeder');
const seedHomeData = require('./seeders/homeSeeder');
const seedSectors = require('./seeders/sectorSeeder');
const seedSolutions = require('./seeders/solutionSeeder');
const seedContent = require('./seeders/contentSeeder');
const seedMenu = require('./seeders/menuSeeder');
const seedProjects = require('./seeders/projectSeeder');
const seedServiceSections = require('./seeders/serviceSectionSeeder');
const seedServices = require('./seeders/serviceSeeder');
const seedSolutionSections = require('./seeders/solutionSectionSeeder'); 
const seedSectorSections = require('./seeders/sectorSectionSeeder'); 
const seedProjectSections = require('./seeders/projectSectionSeeder'); 
const seedPartnerSections = require('./seeders/partnerSectionSeeder'); 
const seedAboutSections = require('./seeders/aboutSectionSeeder');  
const seedAcademySections = require('./seeders/013-academy-sections');
const seedFooterSections = require('./seeders/016-footer-sections');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'AlFaiha Backend Server is running',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/system', settingsRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/data', productRoutes); 
app.use('/api/content', contentRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/admin', adminRoutes);


const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    
    // Setup Associations
    setupAssociations();
    
    // Sync models with database (use { force: true } to reset tables - CAREFUL!)
    await sequelize.sync();
    console.log('✅ Database models synced.');
    
    // Seeders
    if (process.env.RUN_SEEDERS === 'true') {
      console.log('🌱 Running seeders...');
      await seedSuperAdmin();
      await seedSiteSettings();
      await seedHomeData();
      await seedSectors();
      await seedSolutions();
      await seedContent();
      await seedMenu();
      await seedProjects();
      await seedServiceSections();
      await seedServices();
      await seedSolutionSections(); 
      await seedSectorSections(); 
      await seedProjectSections(); 
      await seedPartnerSections();
      await seedAboutSections();
      await seedAcademySections();
      await seedFooterSections();
      console.log('✅ Seeders completed.');
    } else {
      console.log('⏩ Skipping seeders. To run them, add RUN_SEEDERS=true to your .env file.');
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
    
  }
};

startServer();
