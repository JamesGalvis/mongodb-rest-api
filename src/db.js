import { connect, set } from 'mongoose'
import { MONGODB_URI } from './config'

set('strictQuery', true)
;(async () => {
  try {
    const db = await connect(MONGODB_URI)
    console.log(`Database is connected to ${db.connection.name}`)
  } catch (error) {
    console.log(error)
  }
})()
