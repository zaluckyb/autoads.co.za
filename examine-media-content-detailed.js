import { MongoClient } from 'mongodb';

async function examineMediaContentDetailed() {
  const client = new MongoClient('mongodb://localhost:27017');
  
  try {
    await client.connect();
    const db = client.db('payload');
    const postsCollection = db.collection('posts');
    
    console.log('=== Examining Posts with Media Blocks for HTML Content ===\n');
    
    // Find posts with media blocks
    const posts = await postsCollection.find({
      'content.root.children': {
        $elemMatch: {
          'type': 'block',
          'fields.blockType': 'mediaBlock'
        }
      }
    }).toArray();
    
    console.log(`Found ${posts.length} posts with media blocks\n`);
    
    for (const post of posts) {
      console.log(`\n--- Post: ${post.title} (ID: ${post._id}) ---`);
      
      // Function to recursively examine nodes for HTML content
      function examineNode(node, depth = 0) {
        const indent = '  '.repeat(depth);
        
        if (!node) return;
        
        // Check for HTML-like content in text nodes
        if (node.type === 'text' && node.text) {
          const htmlPattern = /<[^>]+>/g;
          const htmlMatches = node.text.match(htmlPattern);
          if (htmlMatches) {
            console.log(`${indent}⚠️  HTML found in text node: "${node.text}"`);
            console.log(`${indent}   HTML tags: ${htmlMatches.join(', ')}`);
          }
        }
        
        // Check for suspicious content in block nodes
        if (node.type === 'block') {
          console.log(`${indent}📦 Block: ${node.fields?.blockType || 'unknown'}`);
          
          if (node.fields?.blockType === 'mediaBlock') {
            console.log(`${indent}   Media ID: ${node.fields.media}`);
            
            // Check if there's any unexpected content in the media block
            Object.keys(node.fields).forEach(key => {
              if (key !== 'blockType' && key !== 'media') {
                console.log(`${indent}   ⚠️  Unexpected field in mediaBlock: ${key} = ${JSON.stringify(node.fields[key])}`);
              }
            });
          }
        }
        
        // Check for HTML content in any string fields
        if (typeof node === 'object') {
          Object.keys(node).forEach(key => {
            const value = node[key];
            if (typeof value === 'string') {
              const htmlPattern = /<[^>]+>/g;
              const htmlMatches = value.match(htmlPattern);
              if (htmlMatches) {
                console.log(`${indent}⚠️  HTML found in ${key}: "${value}"`);
                console.log(`${indent}   HTML tags: ${htmlMatches.join(', ')}`);
              }
            }
          });
        }
        
        // Recursively examine children
        if (node.children && Array.isArray(node.children)) {
          node.children.forEach(child => examineNode(child, depth + 1));
        }
      }
      
      // Examine the content structure
      if (post.content && post.content.root) {
        examineNode(post.content.root);
      }
      
      // Check for any raw HTML in the entire content
      const contentStr = JSON.stringify(post.content);
      const htmlPattern = /<[^>]+>/g;
      const htmlMatches = contentStr.match(htmlPattern);
      if (htmlMatches) {
        console.log(`\n   🚨 Raw HTML found in content JSON:`);
        htmlMatches.forEach(match => {
          console.log(`      ${match}`);
        });
      }
      
      console.log(`\n   Content validation:`);
      console.log(`   - Has root: ${!!post.content?.root}`);
      console.log(`   - Has children: ${!!post.content?.root?.children}`);
      console.log(`   - Children count: ${post.content?.root?.children?.length || 0}`);
      console.log(`   - Block references: ${post.blockReferences}`);
    }
    
    // Also check media collection for HTML in captions
    console.log('\n\n=== Examining Media Collection for HTML in Captions ===\n');
    
    const mediaCollection = db.collection('media');
    const mediaItems = await mediaCollection.find({
      'caption': { $exists: true, $ne: null }
    }).toArray();
    
    console.log(`Found ${mediaItems.length} media items with captions\n`);
    
    for (const media of mediaItems) {
      console.log(`\n--- Media: ${media.filename} (ID: ${media._id}) ---`);
      
      if (media.caption) {
        // Check caption structure
        console.log(`Caption structure:`, JSON.stringify(media.caption, null, 2));
        
        // Check for HTML in caption
        const captionStr = JSON.stringify(media.caption);
        const htmlPattern = /<[^>]+>/g;
        const htmlMatches = captionStr.match(htmlPattern);
        if (htmlMatches) {
          console.log(`🚨 HTML found in caption:`);
          htmlMatches.forEach(match => {
            console.log(`   ${match}`);
          });
        }
      }
    }
    
  } catch (error) {
    console.error('Error examining content:', error);
  } finally {
    await client.close();
  }
}

examineMediaContentDetailed();