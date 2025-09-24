import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import data from "./client/data/data.js";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'client')))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
})

app.get('/travel/:slug', (req, res) => {
    const destination = data.find(d => d.slug === req.params.slug)
    if (!destination) {
        return res.status(404).send('404 ERROR: Error Rendering Page')
    }

    const travelRating = destination.rating ? destination.rating : 'N/A';

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <title>${destination.name}</title>
        <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@1.*/css/pico.min.css">
        <link rel="stylesheet" href="/style.css">
        </head>
        <body>
        <div class="dest-card" style="max-width: 600px; margin: auto; padding: 1rem;">
            <h1>${destination.name}</h1>
            <img src="${destination.image}" alt="${destination.name}" style="max-width:100%; border-radius:10px;">
            <p><strong>Country:</strong> ${destination.country}</p>
            <p>${destination.description}</p>
            <p><strong>Rating:</strong> ${travelRating}</p>
            <button onclick="window.location.href='/'">← Back to Home</button>
        </div>
        </body>
        </html>
    `)
})

// 404 Page
app.use((req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Page Not Found</title>
            <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@1.*/css/pico.min.css">
            <style>
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    text-align: center;
                }
                h1 {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                }
                a {
                    display: inline-block;
                    margin-top: 1rem;
                    text-decoration: none;
                    color: #0078f0;
                }
            </style>
        </head>
        <body>
            <div>
                <h1>404</h1>
                <p>Oops! The page you’re looking for doesn’t exist.</p>
                <a href="/">← Back to Home</a>
            </div>
        </body>
        </html>
    `);
});



app.listen(PORT, () => console.log("3000 Server Running"))

