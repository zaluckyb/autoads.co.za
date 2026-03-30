#!/usr/bin/env node

// Simple test to check WordPress pages connection
const path = require('path');
require('dotenv').config();

// Import WordPress pages database utility
const WordPressPagesDB = require('../migration/utils/wordpress-pages-db');
const config = require('../migration/config/migration.config');

async function testWordPressPages() {
  const wpDB = new WordPressPagesDB(config.wordpress);
  
  try {
    console.log('🔌 Connecting to WordPress database...');
    await wpDB.connect();
    console.log('✅ Connected successfully!');
    
    console.log('📊 Getting page statistics...');
    const totalPages = await wpDB.getTotalCount();
    console.log(`📄 Total pages in WordPress: ${totalPages}`);
    
    if (totalPages > 0) {
      console.log('\n📋 Getting sample pages...');
      const samplePages = await wpDB.getPages(5);
      
      console.log('Sample pages:');
      samplePages.forEach(page => {
        console.log(`- ID: ${page.ID}, Title: "${page.post_title}", Status: ${page.post_status}`);
      });
      
      // Test getting a specific page (ID 2 - Sample Page)
      console.log('\n🔍 Testing specific page retrieval (ID 2)...');
      const specificPage = await wpDB.getPageById(2);
      if (specificPage) {
        console.log(`Found page: "${specificPage.post_title}"`);
        console.log(`Content length: ${specificPage.post_content ? specificPage.post_content.length : 0} characters`);
      } else {
        console.log('Page ID 2 not found');
      }
    }
    
    console.log('\n🎉 WordPress pages test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Full error:', error);
  } finally {
    await wpDB.disconnect();
    console.log('🔌 Disconnected from WordPress database');
  }
}

// Run the test
testWordPressPages().catch(console.error);