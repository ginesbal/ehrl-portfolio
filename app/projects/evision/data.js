export const evisionData = {
    title: 'EVision Advisor',
    description: 'Browse & semantically search electric vehicles with advanced filters, saved lists, intelligent caching and IP rate limiting.',

    links: {
        demo: 'https://evision.up.railway.app/',
        github: 'https://github.com/ginesbal/ev_chatbotmodel'
    },

    year: '2025',
    category: 'Web Development',

    metrics: [
        { value: '200+', label: 'EV Models', detail: 'in database' },
        { value: '<100ms', label: 'Search Time', detail: 'cached queries' },
        { value: '95%', label: 'Accuracy', detail: 'semantic matching' }
    ],

    overview: {
        summary: [
            'EVision Advisor is an intelligent electric vehicle search platform that combines semantic search capabilities with advanced filtering. Built with FastAPI and Sentence-Transformers, it enables users to find their ideal EV through natural language queries.',
            'The platform features in-memory caching for sub-100ms response times, IP-based rate limiting for security, and a clean interface for browsing and saving favorite vehicles.'
        ],
        technicalFocus: [
            'Semantic search with NLP sentence embeddings',
            'FastAPI backend with async request handling',
            'In-memory caching for optimized performance',
            'IP-based rate limiting and security',
            'Advanced filtering and saved lists'
        ],
        coreFeatures: [
            'Natural language vehicle search',
            'Multi-criteria filtering system',
            'Personalized saved vehicle lists',
            'Real-time availability checking',
            'Responsive server-side rendering'
        ]
    },

    technicalHighlights: [
        {
            title: 'Semantic Search Engine',
            challenge: 'Users need to find EVs using natural descriptions rather than technical specifications, requiring intelligent query understanding.',
            approach: 'Implemented Sentence-Transformers for semantic embeddings with cosine similarity matching. Added keyword fallback for specific technical queries.',
            outcome: '95% accuracy in matching user intent to relevant vehicles, with sub-second response times for complex natural language queries.'
        },
        {
            title: 'Performance Optimization',
            challenge: 'Embedding generation for 200+ vehicles on each request would cause unacceptable latency for users.',
            approach: 'Designed in-memory caching system for embeddings and search results, with TTL-based invalidation and LRU eviction policies.',
            outcome: 'Reduced average search time from 2.5s to under 100ms for cached queries, supporting 50+ concurrent users.'
        },
        {
            title: 'Rate Limiting & Security',
            challenge: 'Public API needed protection against abuse while maintaining good UX for legitimate users.',
            approach: 'Implemented IP-based rate limiting with sliding window algorithm, graceful degradation, and clear user feedback.',
            outcome: 'Prevented API abuse while maintaining 99.9% availability for normal usage patterns.'
        }
    ],

    contributions: [
        {
            category: 'Backend Architecture',
            items: [
                'Designed FastAPI application structure',
                'Implemented async request handling',
                'Built caching layer with TTL policies',
                'Created filtering and search endpoints'
            ]
        },
        {
            category: 'Machine Learning',
            items: [
                'Integrated Sentence-Transformers model',
                'Optimized embedding generation pipeline',
                'Implemented similarity scoring algorithm',
                'Built keyword fallback system'
            ]
        }
    ],

    techStack: ['FastAPI', 'Python', 'Sentence-Transformers', 'Railway', 'Jinja2', 'SQLite']
}
