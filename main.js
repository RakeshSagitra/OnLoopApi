import { start } from './server'

process.on('uncaughtException ',(error) => {
  console.log(error)
})

process.on('unhandledRejection', (error) => {
  console.log(error)
})

start()
console.log('Server Main')
