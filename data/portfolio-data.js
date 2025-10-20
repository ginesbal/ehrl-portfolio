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

        description: 'Parking app for downtown Calgary. Helps you find parking spots without circling blocks. Built with React Native and uses PostGIS to find available spots within walking distance.',

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
            challenge: 'The map was painfully slow - taking 800ms+ to load 200 parking spots. Users had to wait every time they moved the map, which made the app feel broken.',

            solution: 'Added PostGIS spatial indexes and switched to ST_DWithin for radius searches instead of calculating distances in JavaScript. Also added 300ms debouncing so the map does not fire off requests while users are still dragging.',

            approach: 'Built this as my SAIT capstone with a team. After graduation, I was not happy with how it looked or performed, so I rebuilt it solo. Learned PostGIS during this process - turned out spatial databases are way faster than doing geography math in JS.',

            impact: 'Got queries down to ~120ms average. The map feels instant now. Also made components easier to test by splitting business logic into custom hooks instead of jamming everything into one massive component.'
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

        description: 'Browse & semantically search EVs with filters, saved lists, caching, and rate limits.',

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