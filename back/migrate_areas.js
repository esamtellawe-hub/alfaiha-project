const db = require('./config/database');
const { QueryTypes } = require('sequelize');

async function migrate() {
  try {
    console.log("Starting migration: Area -> Solution to Area -> Category");
    // Get distinct area and category pairs
    const results = await db.query(
      'SELECT DISTINCT a.sector_area_id, s.category_id FROM area_solutions a JOIN solutions s ON a.solution_id = s.id WHERE s.category_id IS NOT NULL',
      { type: QueryTypes.SELECT }
    );
    
    console.log(`Found ${results.length} unique area-category mappings to migrate.`);
    
    let inserted = 0;
    // Insert into area_categories
    for (const row of results) {
      // Check if it already exists
      const existing = await db.query(
        'SELECT id FROM area_categories WHERE sector_area_id = ? AND category_id = ?',
        { replacements: [row.sector_area_id, row.category_id], type: QueryTypes.SELECT }
      );
      
      if (existing.length === 0) {
        await db.query(
          'INSERT INTO area_categories (sector_area_id, category_id) VALUES (?, ?)',
          { replacements: [row.sector_area_id, row.category_id], type: QueryTypes.INSERT }
        );
        inserted++;
      }
    }
    
    console.log(`Migration completed successfully. Inserted ${inserted} new mappings.`);
  } catch (e) {
    console.error('Migration failed:', e);
  } finally {
    process.exit(0);
  }
}

migrate();
