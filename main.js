const server = require('./server')

process.on('uncaughtException ',(error) => {
  console.log(error)
})

process.on('unhandledRejection', (error) => {
  console.log(error)
})

server.start()
