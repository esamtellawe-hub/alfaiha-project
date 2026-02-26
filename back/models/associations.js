const Category = require('./Category');
const Solution = require('./Solution');
const Sector = require('./Sector');
const SectorArea = require('./SectorArea');
const AreaSolution = require('./AreaSolution');
const Project = require('./Project');

const setupAssociations = () => {
  // Category <-> Solution
  Category.hasMany(Solution, { foreignKey: 'category_id', as: 'solutions' });
  Solution.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

  // Sector <-> SectorArea
  Sector.hasMany(SectorArea, { foreignKey: 'sector_id', as: 'areas' });
  SectorArea.belongsTo(Sector, { foreignKey: 'sector_id', as: 'sector' });

  // SectorArea <-> Solution (Many-to-Many)
  // Note: We updated AreaSolution model to use solution_id, so foreignKey here should be solution_id
  SectorArea.belongsToMany(Solution, { through: AreaSolution, foreignKey: 'sector_area_id', as: 'solutions' });
  Solution.belongsToMany(SectorArea, { through: AreaSolution, foreignKey: 'solution_id', as: 'areas' });
};

module.exports = setupAssociations;
