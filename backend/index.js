const express = require('express');
const pool = require("./db");
const app = express();
const PORT = 3000;

app.get('/api/health', (req, res) => {
	res.json({status: "ok"});
});

app.get("/api/animals", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM animals_tb");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(PORT, () => {
	console.log(`API running on port ${PORT}`);
});
