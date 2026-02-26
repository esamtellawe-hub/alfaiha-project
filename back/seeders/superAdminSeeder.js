const User = require('../models/User');

const seedSuperAdmin = async () => {
  try {
    const existingSuperAdmin = await User.findOne({ 
      where: { role: 'super_admin' } 
    });

    if (existingSuperAdmin) {
      console.log('ℹ️  Super Admin already exists. Skipping seed.');
      return;
    }

    await User.create({
      username: 'superadmin',
      email: 'admin@alfaiha.com',
      password_hash: 'Admin@123', // Change this in production!
      role: 'super_admin'
    });

    console.log('✅ Super Admin created successfully');
    console.log('   Email: admin@alfaiha.com');
    console.log('   Password: Admin@123');
    console.log('   ⚠️  PLEASE CHANGE THIS PASSWORD IMMEDIATELY!');
  } catch (error) {
    console.error('❌ Error seeding Super Admin:', error);
  }
};

module.exports = seedSuperAdmin;
