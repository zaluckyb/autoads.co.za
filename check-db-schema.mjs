import pkg from 'pg';
const { Client } = pkg;

// Database connection from .env
const connectionString = 'postgresql://virtualrealities_co_za:@Gerr@Nell@14015@129.232.241.58:5433/admin_virtualrealities_co_za';

async function checkDatabaseSchema() {
  const client = new Client({
    connectionString: connectionString,
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // Check what tables exist
    const tables = await client.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
    );
    
    console.log('\nAvailable tables:');
    tables.rows.forEach(row => {
      console.log('- ' + row.table_name);
    });

    // Check pages table structure if it exists
    const pagesTableExists = tables.rows.some(row => row.table_name === 'pages');
    
    if (pagesTableExists) {
      const columns = await client.query(
        `SELECT column_name, data_type, is_nullable 
         FROM information_schema.columns 
         WHERE table_name = 'pages' AND table_schema = 'public'
         ORDER BY ordinal_position`
      );
      
      console.log('\nPages table columns:');
      columns.rows.forEach(row => {
        console.log(`- ${row.column_name} (${row.data_type}, nullable: ${row.is_nullable})`);
      });
      
      // Check if there are any existing pages
      const existingPages = await client.query('SELECT id, title, slug FROM pages LIMIT 5');
      console.log('\nExisting pages:');
      if (existingPages.rows.length === 0) {
        console.log('- No pages found');
      } else {
        existingPages.rows.forEach(row => {
          console.log(`- ID: ${row.id}, Title: ${row.title}, Slug: ${row.slug}`);
        });
      }
    } else {
      console.log('\nPages table does not exist');
    }

  } catch (error) {
    console.error('Error checking database schema:', error);
  } finally {
    await client.end();
  }
}

checkDatabaseSchema();