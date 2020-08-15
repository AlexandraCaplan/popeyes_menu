const PORT = process.env.PORT || 4000;

const express = require('express');
const pg = require('pg');


const app = express();
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });


db.query(`
  CREATE TABLE IF NOT EXISTS clicks(
    id SERIAL PRIMARY KEY,
    pageX int NOT NULL,
    pageY int NOT NULL,
    path varchar(120) NOT NULL,
    theItemThatGotClicked varchar(120) NOT NULL,
    howLongUserOnPage int NOT NULL,
    userId varchar NOT NULL
  );    
`);

app.use(express.static('public'));
app.use(express.json());

app.post('/clicks', async function(request, response) {
  console.log("hi from the backend")
  const { pageX, pageY, path, theItemThatGotClicked, howLongUserOnPage, userId } = request.body;
  console.log(request.body);
    const result = await db.query(
      `INSERT INTO clicks (pageX, pageY, path, theItemThatGotClicked, howLongUserOnPage, userId) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
      [pageX, pageY, path, theItemThatGotClicked, howLongUserOnPage, userId]
    );
  response.json(result.rows[0]);
});

app.listen(PORT, () =>
  console.log(`Server is up and running at port ${PORT} 🚀`)
);
