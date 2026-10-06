// src/data/portfolio-data.js

export const projects = [
    {
        id: 'parkaid',
        title: 'parkaid',
        category: 'Mobile Development, Spatial Databases',
        year: '2024',
        role: 'Full Stack Developer',

        description: 'Mobile parking finder for downtown Calgary built with React Native and PostGIS. Lists the closest of about 2,700 city parking spots with distance and walking time.',

        demo: '/parkaid/index.html',
        github: 'https://github.com/ginesbal/parkaid',
        featured: true,

        gallery: [
            '/screenshots/parkaid-map.png',
            '/screenshots/parkaid-session.png'
        ],


        tech: [
            'React Native',
            'Node.js',
            'PostgreSQL',
            'PostGIS',
            'Google Maps API',
            'Expo',
            'Supabase'
        ],

    },

    {
        id: 'evision',
        title: 'EVision Advisor',
        category: 'Web Development, Search',
        year: '2025',

        description: 'Electric vehicle search in plain language: a query like "affordable SUV under 50000" becomes filters and a ranked list of 231 EVs. Built with FastAPI.',

        demo: 'https://evision.up.railway.app/',
        github: 'https://github.com/ginesbal/ev_chatbotmodel',
        featured: true,



        tech: [
            'FastAPI',
            'Python',
            'Jinja2',
            'cachetools',
            'Railway',
            'sentence-transformers (optional)'
        ],

    },
    {
        id: 'aim',
        title: 'aim',
        category: 'Web Development, Product Design',
        year: '2026',
        role: 'Design & Front-end',

        description: 'A calm study planner built around the focus session. Every finished session fills the "a" of the logo toward the day\'s goal, and nothing leaves the browser.',

        demo: null,
        github: 'https://github.com/ginesbal/aim',
        featured: true,

        // desktop screenshots, so the archive preview frames them landscape
        screen: 'desktop',
        gallery: [
            '/screenshots/aim-dashboard.webp',
            '/screenshots/aim-focus.webp'
        ],

        tech: [
            'Next.js',
            'TypeScript',
            'Tailwind CSS',
            'Vanta.js',
            'Web Audio API'
        ]
    }
]

// Utility functions
export const getProjectById = (id) => projects.find(p => p.id === id)
export const getFeaturedProjects = () => projects.filter(p => p.demo !== null)
export const getProjectsByYear = (year) => projects.filter(p => p.year === year)
export const getProjectsByCategory = (category) => projects.filter(p => p.category.includes(category))

export const getAllProjectIds = () => projects.map(p => ({ params: { projectId: p.id } }))