const express = require('express');
const pool = require("./db");
const app = express();
const PORT = 3000;


app.get("/animals/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM animals_tb");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get('/animals/health', (req, res) => {
	res.json({status: "ok"});
});

app.get("/animals/:slug", async (req, res) => {

  const slug = req.params.slug;

  try {

    const result = await pool.query(
      "SELECT common_name, scientific_name FROM animals_tb WHERE slug = $1",
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Animal not found");
    }

    const animal = result.rows[0];

    res.send(`
      <h1>${animal.common_name}</h1>
      <p><em>${animal.scientific_name}</em></p>
    `);

  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }

});

app.listen(PORT, () => {
	console.log(`API running on port ${PORT}`);
});
