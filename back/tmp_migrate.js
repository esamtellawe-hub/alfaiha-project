const s = require('./config/database');
const M = require('./models/PartnerSection');
s.authenticate().then(() => M.sync()).then(() => {
  return require('./seeders/023-partner-sections')();
}).then(() => { console.log('Done!'); process.exit(0); })
  .catch(e => { console.error(e.message); process.exit(1); });
