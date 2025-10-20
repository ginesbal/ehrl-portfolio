export const parkpalData = {
    title: 'ParkPal',
    subtitle: 'Smart Parking Finder',
    description: 'A location-based parking finder for downtown Calgary, demonstrating advanced spatial database optimization, React Native architecture, and performance-focused development.',
    tagline: 'Capstone Project → Individual Redesign',
    
    metrics: [
        { value: '~120ms', label: 'Query Time', detail: 'PostGIS spatial queries' },
        { value: '200+', label: 'Locations', detail: 'Downtown Calgary' },
        { value: '100%', label: 'Coverage', detail: 'Jest + Supertest' }
    ],
    
    tech: ['React Native', 'Node.js', 'PostgreSQL', 'PostGIS', 'Google Maps API', 'Expo', 'Supabase'],
    
    links: {
        github: 'https://github.com/ginesbal/parkpal',
        demo: '/parkpal/index.html',
        linkedin: 'https://www.linkedin.com/in/ehrlbalquin/'
    },
    
    screenshots: [
        { src: '/screenshots/parkpal-home.png', alt: 'Real-time availability with distance calculations' },
        { src: '/screenshots/parkpal-map.png', alt: 'Interactive markers with spatial clustering' },
        { src: '/screenshots/parkpal-session.png', alt: 'Live session tracking with zone-based rates' }
    ],
    
    overview: {
        summary: [
            'ParkPal addresses the challenge of finding available parking in downtown Calgary by providing real-time, location-aware search across 200+ parking spots.',
            'Originally developed as a five-person capstone project, I individually redesigned and rebuilt the application to focus on performance optimization, clean architecture, and modern React Native patterns.'
        ],
        technicalFocus: [
            'Spatial database optimization',
            'Real-time location services',
            'Performance-focused architecture',
            'Comprehensive test coverage'
        ],
        coreFeatures: [
            'GPS & manual location search',
            'Radius-based spatial queries',
            'Interactive map with clustering',
            'Session tracking & cost calculation'
        ]
    },
    
    technicalHighlights: [
        {
            title: 'Spatial Database Architecture',
            challenge: 'Standard database queries were too slow for real-time location-based searches across 200+ parking spots',
            approach: 'Implemented PostGIS spatial indexing with ST_DWithin for efficient radius-based queries',
            outcome: 'Achieved ~120ms average query time, verified through Jest + Supertest automated testing'
        },
        {
            title: 'Performance Optimization',
            challenge: 'Map interactions triggered excessive API calls, causing lag during panning and zooming',
            approach: 'Implemented 300ms request debouncing, memoized distance calculations, and lazy marker loading',
            outcome: 'Eliminated redundant API calls while maintaining smooth, responsive user experience'
        },
        {
            title: 'Architecture & Maintainability',
            challenge: 'Screen components grew to 500+ lines with mixed UI and business logic',
            approach: 'Extracted custom hooks (useLocationManager, useParkingSpots, useSessionManager) following separation of concerns',
            outcome: 'Improved code maintainability and achieved 100% test coverage'
        }
    ],
    
    contributions: [
        {
            category: 'Architecture & Design',
            items: [
                'Complete UI/UX redesign with map-first interaction model',
                'Designed and implemented custom hook architecture',
                'Created reusable component library with consistent patterns'
            ]
        },
        {
            category: 'Database & Backend',
            items: [
                'Implemented PostGIS spatial indexing for efficient location queries',
                'Built RESTful API with Node.js and Express',
                'Migrated database infrastructure to Supabase for improved scalability'
            ]
        },
        {
            category: 'Performance & Testing',
            items: [
                'Optimized API calls with debouncing and memoization strategies',
                'Implemented lazy loading and spatial clustering for map markers',
                'Established comprehensive test suite achieving 100% coverage with Jest and Supertest'
            ]
        }
    ],
    
    context: 'This project began as a five-person capstone project. I subsequently redesigned and rebuilt it independently to demonstrate advanced mobile development capabilities, focusing on performance optimization, clean architecture, and production-ready code quality.'
}