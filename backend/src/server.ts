import express, { Request, Response } from "express";
import cors from 'cors';
import pool from './db_connect.js';   // extension .js obligatoire en ESM

const app = express();

const isDev = process.env.NODE_ENV === 'development'

app.use(cors({
    // Permet de n'accepter les requêtes que si elles viennent de l'adresse définie
    origin: isDev ? 'http://localhost:5173' : 'app://.',
    credentials: true
}))

app.use(express.json());   // Permet de parser le body d'une requête en json (si Content-Type: application/json dans le header de la req)

// Enregistre une observation de tortue dans la base
app.post("/api/observations", async (req: Request, res: Response) => {
    const {
        localisation,
        date_observation,
        meteo,
        nombre_tortues,
        profondeur,
        photos,
        commentaires
    } = req.body;

    // Validation minimale côté serveur
    if (!localisation || !date_observation) {
        res.status(400).json({
            success: false,
            error: "La localisation et la date d'observation sont obligatoires."
        });
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(
            `INSERT INTO cheloniensmartinique
                (localisation, date_observation, meteo, nombre_tortues, profondeur, photos, commentaires)
             VALUES
                (:localisation, :date_observation, :meteo, :nombre_tortues, :profondeur, :photos, :commentaires)`,
            { localisation, date_observation, meteo, nombre_tortues, profondeur, photos, commentaires }
        );
        // insertId est un BigInt → on le convertit pour le JSON
        res.status(201).json({ success: true, id: Number(result.insertId) });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: "Erreur lors de l'enregistrement de l'observation."
        });
    } finally {
        if (conn) conn.release();   // toujours libérer la connexion
    }
})

const port = 3000;
app.listen(port,
    () => console.log(`Server running on http://localhost:${port}`)
);

/* Test route post en console :
fetch("/api/hello", {
    method: "POST",
    body: "Bonjour facteur :D"
})
.then((res) => {
    console.log("ok : ", res.ok);
    console.log("status : ", res.status);
    res.text().then(body => console.log("body :", body));
});
*/