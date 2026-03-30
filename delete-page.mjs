import payload from 'payload';

async function deletePage() {
  try {
    console.log('Starting page deletion process...');
    
    // Initialize payload without config import to avoid module issues
    await payload.init({
      local: true,
    });

    console.log('Payload initialized successfully');

    // First, let's check if the page exists
    console.log('Checking if page with ID 85 exists...');
    const existingPage = await payload.findByID({
      collection: 'pages',
      id: '85',
    });
    
    console.log('Found page:', existingPage);

    // Delete the About Us page with ID 85
    console.log('Attempting to delete page with ID 85...');
    const result = await payload.delete({
      collection: 'pages',
      id: '85',
    });

    console.log('Page deleted successfully:', result);
    process.exit(0);
  } catch (error) {
    console.error('Error during deletion process:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

deletePage();