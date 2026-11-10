const http = require('node:http')
const config = require('../../../next.config.js')

// The dev router reloads this CommonJS export in the same process.
config.distDir = 'output/playwright/avatar/.next-gesture-cycle'
const app = require('next')({ dev: true, hostname: '127.0.0.1', port: 3102 })
const handler = app.getRequestHandler()
app.prepare().then(() => {
  http.createServer((request, response) => handler(request, response))
    .listen(3102, '127.0.0.1', () => console.log('Avatar gesture preview ready on port 3102'))
})
