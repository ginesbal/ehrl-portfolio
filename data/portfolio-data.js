// src/data/portfolio-data.js
// Static imports give next/image each preview's real size, so the archive can serve a resized copy.
import aimPreview from '../public/screenshots/aim-dashboard.webp'
import parkaidPreview from '../public/screenshots/parkaid-map.png'

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

        preview: parkaidPreview,


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

        description: 'Electric vehicle search in plain language: a query like “SUV under 50k with over 450 km of range” becomes filters and a ranked list of 231 EVs. Built with FastAPI.',

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

        // a desktop screenshot, so the archive preview frames it landscape
        screen: 'desktop',
        preview: aimPreview,

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