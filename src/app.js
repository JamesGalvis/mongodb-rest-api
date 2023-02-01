import express from 'express'
import TasksRoutes from './routes/tasks.routes'
import { PORT } from './config'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

// server settings
app.set('port', PORT)

// middlewares
const corsSettings = {}
app.use(cors(corsSettings))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

// routes
app.use('/api', TasksRoutes)

// handling error from controllers routes
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message,
  })
})

// routes not found
app.use((req, res) => {
  res.status(404).json({
    error: 'The requested route does not exist'
  })
})

export default app
