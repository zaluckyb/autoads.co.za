// Using built-in fetch API (Node.js 18+)

const BASE_URL = 'http://localhost:3000';

// About Us page data based on the seed file
const aboutUsPageData = {
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
          },
        ],
        type: 'h1',
      },
    ],
  },
  layout: [
    {
      blockName: 'Welcome Section',
      blockType: 'content',
      columns: [
        {
          size: 'full',
          richText: [
            {
              children: [
                {
                  text: 'Welcome to Virtual Realities',
                },
              ],
              type: 'h2',
            },
            {
              children: [
                {
                  text: 'We specialize in creating immersive 360° virtual reality experiences that transform how businesses showcase their spaces and engage with customers. Our cutting-edge VR technology provides end-to-end solutions for various industries.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      blockName: 'Services Section',
      blockType: 'content',
      columns: [
        {
          size: 'full',
          richText: [
            {
              children: [
                {
                  text: 'Our Services',
                },
              ],
              type: 'h2',
            },
            {
              children: [
                {
                  text: 'We provide comprehensive VR solutions including 360° photography, virtual tour development, interactive experiences, and custom VR applications tailored to your business needs.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      blockName: 'Applications Section',
      blockType: 'content',
      columns: [
        {
          size: 'full',
          richText: [
            {
              children: [
                {
                  text: 'Applications',
                },
              ],
              type: 'h2',
            },
            {
              children: [
                {
                  text: 'Real Estate: Virtual property tours that allow potential buyers to explore properties remotely.',
                },
              ],
              type: 'h3',
            },
            {
              children: [
                {
                  text: 'Education: Immersive learning experiences that bring subjects to life.',
                },
              ],
              type: 'h3',
            },
            {
              children: [
                {
                  text: 'Retail: Virtual showrooms and product demonstrations.',
                },
              ],
              type: 'h3',
            },
          ],
        },
      ],
    },
  ],
  meta: {
    title: 'About Us - Virtual Realities',
    description: 'Learn about Virtual Realities and our innovative VR solutions for real estate, education, and retail industries.',
  },
};

async function createAboutUsPage() {
  try {
    console.log('Creating About Us page...');
    
    // Try to create the page directly (sometimes Payload allows this)
    const response = await fetch(`${BASE_URL}/api/pages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(aboutUsPageData),
    });

    const result = await response.text();
    console.log('Response status:', response.status);
    console.log('Response:', result);

    if (response.ok) {
      console.log('✅ About Us page created successfully!');
    } else {
      console.log('❌ Failed to create page:', result);
    }
  } catch (error) {
    console.error('Error creating About Us page:', error);
  }
}

createAboutUsPage();