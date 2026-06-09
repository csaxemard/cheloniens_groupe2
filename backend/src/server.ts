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

// CORS configuration: allow the Vite dev server during development,
// otherwise allow the packaged app protocol.
app.use(cors({
    origin: isDev ? 'http://localhost:5173' : 'app://.',
    credentials: true
}))
app.use(express.json())

// Rate limiter for authentication endpoints to mitigate brute-force
// attempts. Note: The limiter is only mounted in production
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 }) // 5 attempts max every 15 min
if (process.env.NODE_ENV === 'production') {
    app.use('/api/login', limiter)
    app.use('/api/signin', limiter)
}

app.use('/api', authRoutes)
app.use('/api/observations', observationsRoutes)
app.use('/api/hello', helloRoutes)


// Database initialization: ensure DB is ready before listening.
const port = 3000

try {
    await initDatabase()
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`))
} catch (err) {
    console.error('Failed to initialize database, aborting server start', err)
    process.exit(1)
}