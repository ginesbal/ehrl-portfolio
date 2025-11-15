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

        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Cdefs%3E%3ClinearGradient id="grad" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%236b4f4f;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%237d6d75;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="800" height="600" fill="url(%23grad)"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="48" font-weight="600" fill="white" opacity="0.9"%3EParkPal%3C/text%3E%3C/svg%3E',
        gallery: [
            '/screenshots/parkpal-home.png',
            '/screenshots/parkpal-map.png',
            '/screenshots/parkpal-session.png'
        ],

        gradient: '#6b4f4f, #7d6d75',
        accentColor: '#6b4f4f',

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

    // Add this object to your data/portfolio-data.js array
    // Place it within the first 3 items to appear in Featured grid
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

        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Cdefs%3E%3ClinearGradient id="grad" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23111827;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%234b5563;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="800" height="600" fill="url(%23grad)"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="48" font-weight="600" fill="white" opacity="0.9"%3EEVision%3C/text%3E%3C/svg%3E',

        gradient: '#111827, #4b5563',
        accentColor: '#111827',

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