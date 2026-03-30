const Job = require('./models/Job');
const db = require('./config/database');

async function check() {
    try {
        await db.authenticate();
        console.log('DB Connected');
        const jobs = await Job.findAll();
        console.log('Jobs found:', jobs.length);
    } catch (err) {
        console.error('FULL ERROR:', err);
    } finally {
        process.exit();
    }
}
check();
