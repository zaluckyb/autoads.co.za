import { getPayload } from 'payload';
import config from './dist/payload.config.js';

async function createAboutUsPage() {
  try {
    const payload = await getPayload({ config });
    
    // Check if About Us page already exists
    const existingPages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'about-us'
        }
      }
    });
    
    if (existingPages.docs.length > 0) {
      console.log('About Us page already exists:', existingPages.docs[0].id);
      return existingPages.docs[0];
    }
    
    // Create the About Us page
    const aboutUsPage = await payload.create({
      collection: 'pages',
      data: {
        title: 'About Us',
        slug: 'about-us',
        _status: 'published',
        hero: {
          type: 'highImpact',
          richText: [
            {
              children: [
                {
                  text: 'WE ARE VIRTUAL REALITIES!',
                  bold: true
                }
              ],
              type: 'h1'
            }
          ]
        },
        layout: [
          {
            blockType: 'content',
            columns: [
              {
                size: 'full',
                richText: [
                  {
                    children: [
                      {
                        text: 'Welcome Section',
                        bold: true
                      }
                    ],
                    type: 'h2'
                  },
                  {
                    children: [
                      {
                        text: 'Welcome to Virtual Realities, where we specialize in creating immersive 360° experiences and cutting-edge VR solutions. Our team is dedicated to transforming how businesses and individuals interact with digital content through innovative virtual reality technologies.'
                      }
                    ],
                    type: 'p'
                  }
                ]
              }
            ]
          },
          {
            blockType: 'content',
            columns: [
              {
                size: 'full',
                richText: [
                  {
                    children: [
                      {
                        text: 'Our Services',
                        bold: true
                      }
                    ],
                    type: 'h2'
                  },
                  {
                    children: [
                      {
                        text: 'We provide end-to-end VR solutions including 360° photography, virtual tours, interactive experiences, and custom VR application development. Our comprehensive approach ensures that every project delivers exceptional results that exceed expectations.'
                      }
                    ],
                    type: 'p'
                  }
                ]
              }
            ]
          },
          {
            blockType: 'content',
            columns: [
              {
                size: 'full',
                richText: [
                  {
                    children: [
                      {
                        text: 'Applications',
                        bold: true
                      }
                    ],
                    type: 'h2'
                  },
                  {
                    children: [
                      {
                        text: 'Real Estate: Transform property showcasing with immersive virtual tours that allow potential buyers to explore properties remotely.'
                      }
                    ],
                    type: 'p'
                  },
                  {
                    children: [
                      {
                        text: 'Education: Enhance learning experiences with interactive VR content that makes complex concepts accessible and engaging.'
                      }
                    ],
                    type: 'p'
                  },
                  {
                    children: [
                      {
                        text: 'Retail: Create virtual showrooms and product demonstrations that drive customer engagement and sales.'
                      }
                    ],
                    type: 'p'
                  }
                ]
              }
            ]
          },
          {
            blockType: 'content',
            columns: [
              {
                size: 'full',
                richText: [
                  {
                    children: [
                      {
                        text: 'Our Team & Technology',
                        bold: true
                      }
                    ],
                    type: 'h2'
                  },
                  {
                    children: [
                      {
                        text: 'Our experienced team combines technical expertise with creative vision to deliver world-class VR solutions. We utilize the latest technologies and industry best practices to ensure our clients receive innovative, reliable, and scalable virtual reality experiences.'
                      }
                    ],
                    type: 'p'
                  }
                ]
              }
            ]
          }
        ],
        meta: {
          title: 'About Us - Virtual Realities',
          description: 'Learn about Virtual Realities, specialists in 360° experiences and VR solutions for real estate, education, and retail applications.'
        }
      }
    });
    
    console.log('About Us page created successfully:', aboutUsPage.id);
    return aboutUsPage;
    
  } catch (error) {
    console.error('Error creating About Us page:', error);
    throw error;
  }
}

createAboutUsPage().then(() => {
  console.log('Script completed successfully');
  process.exit(0);
}).catch((error) => {
  console.error('Script failed:', error);
  process.exit(1);
});