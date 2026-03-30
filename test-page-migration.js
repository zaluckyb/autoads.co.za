import payload from 'payload';
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';
import config from './src/payload.config.ts';
import dotenv from 'dotenv';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Debug environment variables
console.log('Environment check:');
console.log('PAYLOAD_SECRET:', process.env.PAYLOAD_SECRET ? 'Set' : 'Not set');
console.log('DATABASE_URI:', process.env.DATABASE_URI ? 'Set' : 'Not set');

// Import migration utilities from the migration directory
const migrationPath = path.join(__dirname, '..', 'migration');

// For now, let's create a simple test that initializes payload and checks the connection
async function testPageMigration() {
  try {
    console.log('🚀 Testing Page Migration System...');
    
    // Initialize Payload with explicit secret
    console.log('📦 Initializing Payload CMS...');
    await payload.init({
      secret: process.env.PAYLOAD_SECRET,
      config,
      local: true
    });
    
    console.log('✅ Payload initialized successfully!');
    
    // Try to find existing pages
    const pages = await payload.find({
      collection: 'pages',
      limit: 5
    });
    
    console.log(`📄 Found ${pages.totalDocs} pages in the database`);
    
    if (pages.docs.length > 0) {
      console.log('Sample page:', pages.docs[0].title);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testPageMigration();