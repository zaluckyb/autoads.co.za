import pkg from 'pg';
const { Client } = pkg;

// Database connection from .env
const connectionString = 'postgresql://virtualrealities_co_za:@Gerr@Nell@14015@129.232.241.58:5433/admin_virtualrealities_co_za';

// About Us page data matching the actual database schema
const aboutUsPageData = {
  title: 'About Us',
  slug: 'about-us',
  _status: 'published',
  hero_type: 'highImpact',
  hero_rich_text: [
    {
      children: [
        {
          text: 'WE ARE VIRTUAL REALITIES!',
        },
      ],
      type: 'h1',
    },
    {
      children: [
        {
          text: 'We specialize in creating immersive 360° virtual reality experiences that transform how businesses showcase their spaces and engage with customers.',
        },
      ],
    },
  ],
  meta_title: 'About Us - Virtual Realities',
  meta_description: 'Learn about Virtual Realities and our innovative VR solutions for real estate, education, and retail industries.',
  published_at: new Date().toISOString(),
};

async function createAboutUsPageInDB() {
  const client = new Client({
    connectionString: connectionString,
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // Check if page already exists
    const existingPage = await client.query(
      'SELECT id FROM pages WHERE slug = $1',
      ['about-us']
    );

    if (existingPage.rows.length > 0) {
      console.log('About Us page already exists with ID:', existingPage.rows[0].id);
      return;
    }

    // Insert the page using the correct schema
    const result = await client.query(
      `INSERT INTO pages (title, slug, _status, hero_type, hero_rich_text, meta_title, meta_description, published_at, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW()) 
       RETURNING id`,
      [
        aboutUsPageData.title,
        aboutUsPageData.slug,
        aboutUsPageData._status,
        aboutUsPageData.hero_type,
        JSON.stringify(aboutUsPageData.hero_rich_text),
        aboutUsPageData.meta_title,
        aboutUsPageData.meta_description,
        aboutUsPageData.published_at
      ]
    );

    console.log('✅ About Us page created successfully with ID:', result.rows[0].id);
    
    // Now let's add some content blocks to the page
    const pageId = result.rows[0].id;
    
    // Check if there are content block tables we can use
    const blockTables = await client.query(
      `SELECT table_name FROM information_schema.tables 
       WHERE table_schema = 'public' AND table_name LIKE '%pages%block%'`
    );
    
    console.log('Available block tables:', blockTables.rows.map(r => r.table_name));
    
  } catch (error) {
    console.error('Error creating About Us page:', error);
  } finally {
    await client.end();
  }
}

createAboutUsPageInDB();