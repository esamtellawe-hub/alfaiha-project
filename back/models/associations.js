const Category = require('./Category');
const Solution = require('./Solution');
const Sector = require('./Sector');
const SectorArea = require('./SectorArea');
const AreaCategory = require('./AreaCategory');
const AreaSolution = require('./AreaSolution');
const Project = require('./Project');
const Job = require('./Job');
const JobApplication = require('./JobApplication');

const setupAssociations = () => {
  // Category <-> Solution
  Category.hasMany(Solution, { foreignKey: 'category_id', as: 'solutions' });
  Solution.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

  // Sector <-> SectorArea
  Sector.hasMany(SectorArea, { foreignKey: 'sector_id', as: 'areas' });
  SectorArea.belongsTo(Sector, { foreignKey: 'sector_id', as: 'sector' });

  // SectorArea <-> Category (Many-to-Many)
  SectorArea.belongsToMany(Category, { through: AreaCategory, foreignKey: 'sector_area_id', as: 'categories' });
  Category.belongsToMany(SectorArea, { through: AreaCategory, foreignKey: 'category_id', as: 'areas' });

  // SectorArea <-> Solution (Many-to-Many)
  SectorArea.belongsToMany(Solution, { through: AreaSolution, foreignKey: 'sector_area_id', as: 'solutions' });
  Solution.belongsToMany(SectorArea, { through: AreaSolution, foreignKey: 'solution_id', as: 'areas' });

  // Jobs <-> Applications
  Job.hasMany(JobApplication, { foreignKey: 'job_id', as: 'applications' });
  JobApplication.belongsTo(Job, { foreignKey: 'job_id', as: 'job' });
};

module.exports = setupAssociations;
