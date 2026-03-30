import payload from 'payload'
import path from 'path'
import config from './src/payload.config.ts'

// Initialize Payload
const start = async () => {
  await payload.init({
    config,
    secret: process.env.PAYLOAD_SECRET || 'your-secret-here',
    local: true,
    onInit: () => {
      console.log('Payload initialized successfully')
    },
  })

  try {
    // Delete the About Us page by ID
    const result = await payload.delete({
      collection: 'pages',
      id: 85,
    })

    console.log('About Us page deleted successfully:', result)
    console.log('Page ID:', result.id)
    console.log('Page slug:', result.slug)
    
  } catch (error) {
    console.error('Error deleting page:', error.message)
  }

  process.exit(0)
}

start()