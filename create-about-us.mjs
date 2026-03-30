import { getPayload } from 'payload'
import config from './src/payload.config.ts'
import { aboutUs } from './src/endpoints/seed/about-us-page.ts'

const createAboutUsPage = async () => {
  try {
    console.log('Initializing Payload...')
    const payload = await getPayload({ config })
    
    console.log('Checking for existing About Us page...')
    const existingPage = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'about-us'
        }
      }
    })
    
    if (existingPage.docs.length > 0) {
      console.log('About Us page already exists. Updating it...')
      const updatedPage = await payload.update({
        collection: 'pages',
        id: existingPage.docs[0].id,
        data: aboutUs()
      })
      console.log('About Us page updated successfully:', updatedPage.slug)
    } else {
      console.log('Creating About Us page...')
      const newPage = await payload.create({
        collection: 'pages',
        data: aboutUs()
      })
      console.log('About Us page created successfully:', newPage.slug)
    }
    
    console.log('About Us page is now available at: http://localhost:3000/about-us')
    process.exit(0)
  } catch (error) {
    console.error('Error creating About Us page:', error)
    process.exit(1)
  }
}

createAboutUsPage()