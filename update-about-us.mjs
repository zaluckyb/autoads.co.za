import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const updateAboutUsPage = async () => {
  try {
    // Read the about-us-data.json file
    const aboutUsDataPath = path.join(__dirname, 'about-us-data.json')
    const aboutUsData = JSON.parse(fs.readFileSync(aboutUsDataPath, 'utf8'))
    
    console.log('Updating About Us page with content...')
    
    // Import Payload dynamically to avoid module resolution issues
    const { getPayload } = await import('payload')
    
    // Import the config
    const configModule = await import('./src/payload.config.ts')
    const config = configModule.default
    
    // Initialize Payload
    const payload = await getPayload({ config })
    
    // Find the existing About Us page
    const existingPages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'about-us'
        }
      }
    })
    
    if (existingPages.docs.length === 0) {
      console.log('About Us page not found, creating new one...')
      
      // Create new page
      const newPage = await payload.create({
        collection: 'pages',
        data: {
          title: aboutUsData.title,
          slug: aboutUsData.slug,
          _status: aboutUsData._status,
          hero: aboutUsData.hero,
          layout: aboutUsData.layout,
          meta: aboutUsData.meta
        }
      })
      
      console.log('About Us page created successfully with ID:', newPage.id)
    } else {
      const pageId = existingPages.docs[0].id
      console.log('Found existing About Us page with ID:', pageId)
      
      // Update existing page
      const updatedPage = await payload.update({
        collection: 'pages',
        id: pageId,
        data: {
          title: aboutUsData.title,
          slug: aboutUsData.slug,
          _status: aboutUsData._status,
          hero: aboutUsData.hero,
          layout: aboutUsData.layout,
          meta: aboutUsData.meta
        }
      })
      
      console.log('About Us page updated successfully!')
      console.log('Page title:', updatedPage.title)
      console.log('Page status:', updatedPage._status)
      console.log('Layout blocks:', updatedPage.layout?.length || 0)
    }
    
    console.log('\nAbout Us page is now available at: http://localhost:3000/about-us')
    
  } catch (error) {
    console.error('Error updating About Us page:', error)
    process.exit(1)
  }
}

// Run the update
updateAboutUsPage().then(() => {
  console.log('Update completed successfully!')
  process.exit(0)
}).catch((error) => {
  console.error('Update failed:', error)
  process.exit(1)
})