import fs from 'fs'
import fetch from 'node-fetch'

const createAboutUsPage = async () => {
  try {
    console.log('Creating About Us page content...')
    
    // Simple content structure that should work with Lexical
    const pageData = {
      title: 'About Us',
      slug: 'about-us',
      _status: 'published',
      hero: {
        type: 'highImpact',
        richText: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 1,
                    mode: 'normal',
                    style: '',
                    text: 'WE ARE VIRTUAL REALITIES!',
                    type: 'text',
                    version: 1
                  }
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'heading',
                version: 1,
                tag: 'h1'
              }
            ],
            direction: 'ltr'
          }
        }
      },
      layout: [
        {
          blockType: 'content',
          columns: [
            {
              size: 'full',
              richText: {
                root: {
                  type: 'root',
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      children: [
                        {
                          detail: 0,
                          format: 1,
                          mode: 'normal',
                          style: '',
                          text: 'Welcome to Virtual Realities',
                          type: 'text',
                          version: 1
                        }
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      type: 'heading',
                      version: 1,
                      tag: 'h2'
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: 'normal',
                          style: '',
                          text: 'Welcome to Virtual Realities, where we specialize in creating immersive 360° experiences and cutting-edge VR solutions. Our team is dedicated to transforming how businesses and individuals interact with digital content through innovative virtual reality technologies.',
                          type: 'text',
                          version: 1
                        }
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      type: 'paragraph',
                      version: 1
                    }
                  ],
                  direction: 'ltr'
                }
              }
            }
          ]
        },
        {
          blockType: 'content',
          columns: [
            {
              size: 'full',
              richText: {
                root: {
                  type: 'root',
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      children: [
                        {
                          detail: 0,
                          format: 1,
                          mode: 'normal',
                          style: '',
                          text: 'Our Services',
                          type: 'text',
                          version: 1
                        }
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      type: 'heading',
                      version: 1,
                      tag: 'h2'
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: 'normal',
                          style: '',
                          text: 'We provide end-to-end VR solutions including 360° photography, virtual tours, interactive experiences, and custom VR application development.',
                          type: 'text',
                          version: 1
                        }
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      type: 'paragraph',
                      version: 1
                    }
                  ],
                  direction: 'ltr'
                }
              }
            }
          ]
        }
      ],
      meta: {
        title: 'About Us - Virtual Realities',
        description: 'Learn about Virtual Realities, specialists in 360° experiences and VR solutions.'
      }
    }
    
    // First, try to find existing page
    console.log('Checking for existing About Us page...')
    const findResponse = await fetch('http://localhost:3000/api/pages?where[slug][equals]=about-us')
    
    if (!findResponse.ok) {
      throw new Error(`Failed to search for page: ${findResponse.statusText}`)
    }
    
    const findResult = await findResponse.json()
    
    if (findResult.docs && findResult.docs.length > 0) {
      // Update existing page
      const pageId = findResult.docs[0].id
      console.log(`Updating existing page with ID: ${pageId}`)
      
      const updateResponse = await fetch(`http://localhost:3000/api/pages/${pageId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pageData)
      })
      
      if (!updateResponse.ok) {
        const errorText = await updateResponse.text()
        console.log('Update failed, response:', errorText)
        throw new Error(`Failed to update page: ${updateResponse.statusText}`)
      }
      
      const result = await updateResponse.json()
      console.log('Page updated successfully!')
      console.log('Page ID:', result.doc?.id || pageId)
      console.log('Title:', result.doc?.title || pageData.title)
      
    } else {
      // Create new page
      console.log('Creating new About Us page...')
      
      const createResponse = await fetch('http://localhost:3000/api/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pageData)
      })
      
      if (!createResponse.ok) {
        const errorText = await createResponse.text()
        console.log('Create failed, response:', errorText)
        throw new Error(`Failed to create page: ${createResponse.statusText}`)
      }
      
      const result = await createResponse.json()
      console.log('Page created successfully!')
      console.log('Page ID:', result.doc?.id)
      console.log('Title:', result.doc?.title)
    }
    
    console.log('\nAbout Us page is now available at: http://localhost:3000/about-us')
    
  } catch (error) {
    console.error('Error:', error.message)
    if (error.response) {
      console.error('Response status:', error.response.status)
      console.error('Response text:', await error.response.text())
    }
    process.exit(1)
  }
}

// Run the script
createAboutUsPage().then(() => {
  console.log('Script completed successfully!')
  process.exit(0)
}).catch((error) => {
  console.error('Script failed:', error)
  process.exit(1)
})