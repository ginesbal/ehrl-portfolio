// src/data/portfolio-data.js
// Static imports give next/image each image's real size, so it can serve a resized copy.
import aimThumb from '../public/screenshots/aim-dashboard-crop.webp'
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
        // the home row's text; its tech line already names the stack
        summary: 'Mobile parking finder for downtown Calgary. Lists the closest of about 2,700 city parking spots with distance and walking time.',

        demo: '/parkaid/index.html',
        github: 'https://github.com/ginesbal/parkaid',
        featured: true,

        preview: parkaidPreview,


        tech: [
            'React Native',
            'PostGIS',
            'Node.js',
            'PostgreSQL',
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
        // the home row shows the sample query beside it, so the text doesn't repeat it
        summary: 'Search electric vehicles by describing the one you want. The request becomes filters and a ranked list.',

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

        description: 'A calm study planner built around the focus session. Every finished session fills the “a” of the logo toward the day’s goal, and nothing leaves the browser.',

        demo: null,
        github: 'https://github.com/ginesbal/aim',
        featured: true,

        // a desktop screenshot, so the archive preview frames it landscape
        screen: 'desktop',
        preview: aimPreview,
        // the home row's crop: the launcher and the "a" stay legible at thumbnail size
        thumb: aimThumb,

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