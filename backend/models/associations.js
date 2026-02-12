const Category = require('./Category');
const Product = require('./Product');
const Sector = require('./Sector');
const SectorArea = require('./SectorArea');
const AreaProduct = require('./AreaProduct');
const Project = require('./Project');

const setupAssociations = () => {
  // Category <-> Product
  Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });
  Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

  // Sector <-> SectorArea
  Sector.hasMany(SectorArea, { foreignKey: 'sector_id', as: 'areas' });
  SectorArea.belongsTo(Sector, { foreignKey: 'sector_id', as: 'sector' });

  // SectorArea <-> Product (Many-to-Many)
  SectorArea.belongsToMany(Product, { through: AreaProduct, foreignKey: 'sector_area_id', as: 'products' });
  Product.belongsToMany(SectorArea, { through: AreaProduct, foreignKey: 'product_id', as: 'areas' });
};

module.exports = setupAssociations;
