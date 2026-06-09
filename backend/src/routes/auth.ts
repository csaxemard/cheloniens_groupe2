import { Router } from 'express'
import pool from '../db/pool.js'
import bcrypt from 'bcrypt'

const router = Router()

router.post('/signin', async (req, res) => {
    console.log('Signin request')
    const { username, password } = req.body
    const conn = await pool.getConnection()
    try {
        console.log('Checking if user exists...')
        const existing = await conn.query('SELECT id FROM users WHERE username = ?', [username])
        console.log('Existing check result:', existing)

        if (existing.length > 0) {
            console.log('User already exists')
            res.status(400).json({ success: false, error: 'Cet identifiant est déjà pris' })
            return
        }

        console.log('Hashing password...')
        const hashedPassword = await bcrypt.hash(password, 12)
        console.log('Password hashed')

        console.log('Inserting user...')
        const result = await conn.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
            [username, hashedPassword, 'user'])
        console.log('Insert result:', result)

        res.json({ success: true, message: 'Inscription réussie' })
    } catch (err: any) {
        console.error('Detailed error:', err)
        console.error('Error code:', err.code)
        console.error('Error message:', err.message)
        console.error('Error stack:', err.stack)
        res.status(500).json({ success: false, error: `Erreur serveur: ${err.message}` })
    } finally {
        conn.release()
    }
})
router.post('/login', async (req, res) => {
    console.log('login request')
    const { username, password } = req.body
    const conn = await pool.getConnection()
    try {
        const rows = await conn.query('SELECT id, username, role, password FROM users WHERE username = ?', [username])

        if (rows.length === 0) {
            res.status(401).json({ success: false, error: 'Identifiant ou mot de passe incorrect' })
            return
        }

        const user = rows[0]
        const valid = await bcrypt.compare(password, user.password)

        if (valid) {
            res.json({ success: true, user: { id: user.id, username: user.username, role: user.role } })
            console.log('Login success:', username)
        } else {
            res.status(401).json({ success: false, error: 'Identifiant ou mot de passe incorrect' })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ success: false, error: 'Erreur serveur' })
    } finally {
        conn.release()
    }
})

// Make user admin
router.put('/user/:id/make-admin', async (req, res) => {
    const { id } = req.params
    const { requesterId } = req.body

    let conn
    try {
        conn = await pool.getConnection()

        // Check requester is admin
        const [requester] = await conn.query(
            'SELECT role FROM users WHERE id = ?',
            [requesterId]
        )

        if (!requester || requester.role !== 'admin') {
            res.status(403).json({ success: false, error: 'Non autorisé. Admin requis.' })
            return
        }

        // Make user admin
        const result = await conn.query('UPDATE users SET role = "admin" WHERE id = ?', [id])

        if (result.affectedRows === 0) {
            res.status(404).json({ success: false, error: 'Utilisateur non trouvé' })
        } else {
            res.json({ success: true, message: 'Utilisateur promu admin' })
        }
    } finally {
        if (conn) conn.release()
    }
})

export default router