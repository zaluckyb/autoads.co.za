import 'dotenv/config';
import payload from 'payload';
import config from './src/payload.config.ts';

async function deletePage() {
  try {
    console.log('Initializing Payload...');
    await payload.init({
      config,
      local: true,
      secret: '3e7bb03fbb16015915e9eaab',
    });

    // First, let's find the page to confirm it exists
    console.log('Searching for pages with slug "about-us"...');
    const pages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'about-us'
        }
      }
    });
    
    console.log(`Found ${pages.docs.length} page(s) with slug "about-us"`);
    
    if (pages.docs.length > 0) {
      for (const page of pages.docs) {
        console.log(`Attempting to delete page: ID ${page.id}, Title: "${page.title}", Slug: "${page.slug}"`);
        
        try {
          // Try direct database deletion using Payload's database adapter
          const db = payload.db;
          await db.deleteOne({
            collection: 'pages',
            where: { id: { equals: page.id } }
          });
          console.log(`Successfully deleted page with ID: ${page.id}`);
        } catch (dbError) {
          console.log(`Database deletion failed: ${dbError.message}`);
          
          // Fallback: try the regular delete method with error handling
          try {
            await payload.delete({
              collection: 'pages',
              id: page.id,
              disableVerificationEmail: true,
            });
            console.log(`Fallback deletion successful for ID: ${page.id}`);
          } catch (fallbackError) {
            console.log(`Fallback deletion also failed: ${fallbackError.message}`);
          }
        }
      }
    } else {
      console.log('No pages found with slug "about-us"');
      
      // Try to find by ID 85 specifically
      try {
        const pageById = await payload.findByID({
          collection: 'pages',
          id: 85
        });
        console.log(`Found page by ID 85: "${pageById.title}"`);
        
        // Try database deletion
        const db = payload.db;
        await db.deleteOne({
          collection: 'pages',
          where: { id: { equals: 85 } }
        });
        console.log('Successfully deleted page with ID 85');
      } catch (idError) {
        console.log(`Could not find or delete page with ID 85: ${idError.message}`);
      }
    }
  } catch (error) {
    console.error('Error deleting page:', error.message);
  } finally {
    process.exit(0);
  }
}

deletePage();