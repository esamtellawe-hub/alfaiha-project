require('dotenv').config();
const RegionalOffice = require('./models/RegionalOffice');

async function check() {
  try {
    const offices = await RegionalOffice.findAll();
    console.log("OFFICES IN DB:", offices.map(o => o.toJSON()));
  } catch (e) {
    console.log("ERROR:", e);
  }
  process.exit();
}
check();
