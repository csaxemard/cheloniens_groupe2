import { Router } from 'express'
import pool from '../db/pool.js'

const router = Router()

router.post('/', async (req, res) => {
    const {
        localisation,
        date_observation,
        meteo,
        espece,
        nombre_tortues,
        profondeur,
        photos,
        commentaires,
        sexe,
        stade,
        user_id
    } = req.body

    // Check that the user is authenticated
    if (!user_id) {
        res.status(401).json({ success: false, error: 'Utilisateur non authentifié' })
        return
    }

    if (!localisation || !date_observation || !meteo || !espece) {
        res.status(400).json({ success: false, error: 'Champs obligatoires manquants' })
        return
    }

    let conn
    try {
        conn = await pool.getConnection()

        // Verify that the user exists
        const user = await conn.query('SELECT id FROM users WHERE id = ?', [user_id])
        if (user.length === 0) {
            res.status(401).json({ success: false, error: 'Utilisateur invalide' })
            return
        }

        const result = await conn.query(
            `INSERT INTO observations 
          (localisation, date_observation, meteo, espece, nombre_tortues, profondeur, photos, commentaires, sexe, stade, user_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                localisation,
                date_observation,
                meteo,
                espece,
                nombre_tortues || null,
                profondeur || null,
                photos || null,
                commentaires || null,
                sexe || null,
                stade || null,
                user_id
            ]
        )

        res.status(201).json({ success: true, id: Number(result.insertId) })
    } catch (err: any) {
        console.error('Erreur SQL:', err)
        res.status(500).json({ success: false, error: 'Erreur serveur: ' + err.message })
    } finally {
        if (conn) conn.release()
    }
})

router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params
    let conn
    try {
        conn = await pool.getConnection()
        const rows = await conn.query(
            'SELECT * FROM observations WHERE user_id = ? ORDER BY date_observation DESC',
            [userId]
        )
        res.json({ success: true, observations: rows })
    } finally {
        if (conn) conn.release()
    }
})

export default router