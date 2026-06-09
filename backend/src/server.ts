import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth'
import observationsRoutes from './routes/observations'
import helloRoutes from './routes/test_hello'
import { initDatabase } from './db/init'
import rateLimit from 'express-rate-limit'
import bcrypt from 'bcrypt'
import pool from './db/pool'


const app = express()
const isDev = process.env.NODE_ENV === 'development'

app.use(cors({
    origin: isDev ? 'http://localhost:5173' : 'app://.',
    credentials: true
}))
app.use(express.json())

// Limit login and signin attempts to prevent attacks
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 }) // 5 attempts max every 15min
if (process.env.NODE_ENV === 'production') {
    app.use('/api/login', limiter)
    app.use('/api/signin', limiter)
}

app.use('/api', authRoutes)
app.use('/api/observations', observationsRoutes)
app.use('/api/hello', helloRoutes)


// Wait for db to be ready before starting
await initDatabase()

const port = 3000
initDatabase().then(() => {
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`))
})