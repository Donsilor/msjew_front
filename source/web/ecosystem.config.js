module.exports = {
  apps: [
    {
      name: 'API',
      script: './server/index.js',
      instances: 1,
      autorestart: false,
      watch: false,
      max_memory_restart: '2G'
    }
  ]
}
