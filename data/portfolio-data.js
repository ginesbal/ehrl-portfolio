// src/data/portfolio-data.js

export const projects = [
    {
        id: 'parkpal',
        title: 'ParkPal',
        subtitle: 'Smart Parking Finder',
        category: 'Mobile Development, Spatial Databases',
        year: '2024',
        duration: '3 months',
        role: 'Full Stack Developer',

        description: 'Mobile parking finder for downtown Calgary built with React Native and PostGIS. Shows available parking spots within walking distance using GPS-based radius searches.',

        demo: '/parkpal/index.html',
        github: 'https://github.com/ginesbal/parkpal',
        featured: true,

        gallery: [
            '/screenshots/parkpal-map.png',
            '/screenshots/parkpal-home.png',
            '/screenshots/parkpal-session.png'
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

        details: {
            challenge: 'Initial version took 800ms+ to load parking spots every time the map moved, making the app feel unresponsive during the core use case of finding parking quickly.',

            solution: 'Replaced client-side distance calculations with PostGIS spatial indexes using ST_DWithin for radius-based queries. Added 300ms debouncing to reduce redundant API calls during map panning.',

            approach: 'Started as a SAIT capstone project with a team. After graduating, I rebuilt it from scratch to improve the UI and address the performance issues. This is where I learned PostGIS — databases handle spatial calculations much more efficiently than JavaScript.',

            impact: 'Brought average query times down to around 120ms. Also refactored components into testable custom hooks, separating business logic from UI rendering.'
        },

        features: [
            {
                title: 'Location-Based Search',
                description: 'GPS positioning with manual pin-drop for custom search areas'
            },
            {
                title: 'Interactive Map',
                description: 'Custom markers with clustering and flippable detail cards'
            },
            {
                title: 'Session Management',
                description: 'Live parking timer with zone-based cost calculations'
            }
        ],

        metrics: [
            { label: 'Query Time', value: '~120ms' },
            { label: 'Spots Retrieved', value: '100+' },
            { label: 'Test Coverage', value: '7 passing' },
            { label: 'Spatial Accuracy', value: '100%' }
        ]
    },

    {
        id: 'evision',
        title: 'EVision Advisor',
        subtitle: 'NLP-powered EV search',
        category: 'Web Development, Machine Learning',
        year: '2025',

        description: 'Electric vehicle search tool using natural language processing. Built with FastAPI and sentence-transformers to handle semantic queries like "affordable sedan with long range" alongside traditional filters.',

        demo: 'https://evision.up.railway.app/',
        github: 'https://github.com/ginesbal/ev_chatbotmodel',
        featured: true,



        tech: [
            'FastAPI',
            'Python',
            'Sentence-Transformers',
            'Railway',
            'Jinja2'
        ],

        details: {
            challenge: 'Traditional car search requires users to know exact specifications upfront. Many people search in natural language terms rather than rigid filter categories.',

            solution: 'Implemented semantic search using sentence-transformers to encode vehicle descriptions and user queries as vectors, matching them with cosine similarity. Kept traditional filters available as an alternative search method.',

            approach: 'Built with FastAPI and deployed on Railway. Added in-memory caching to avoid re-encoding vectors on every request, and implemented IP-based rate limiting.',

            impact: 'Search responds in under 200ms. Users can search using natural descriptions or switch to structured filters based on their preference.'
        },

        features: [
            {
                title: 'Semantic Search',
                description: 'Natural language search with keyword fallback'
            },
            {
                title: 'Advanced Filtering',
                description: 'Filter by price, range, body, drivetrain, seats'
            },
            {
                title: 'Performance Optimization',
                description: 'In-memory caching and IP rate limiting'
            }
        ]
    }
]

// Utility functions
export const getProjectById = (id) => projects.find(p => p.id === id)
export const getFeaturedProjects = () => projects.filter(p => p.demo !== null)
export const getProjectsByYear = (year) => projects.filter(p => p.year === year)
export const getProjectsByCategory = (category) => projects.filter(p => p.category.includes(category))

export const getAllProjectIds = () => projects.map(p => ({ params: { projectId: p.id } }))