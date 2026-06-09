import express, { Request, Response } from "express";
import cors from 'cors'

const app = express();

const isDev = process.env.NODE_ENV === 'development'

app.use(cors({
    // Permet de n'accepter les requêtes que si elles viennent de l'adresse définie
    origin: isDev ? 'http://localhost:5173' : 'app://.',
    credentials: true
}))

app.use(express.json());   // Permet de parser le body d'une requête en json (si Content-Type: application/json dans le header de la req)

// Route post test
app.post("/api/hello", (req: Request, res: Response) => {
    console.log(req.body);
    res.send("📧 : Hello !")
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