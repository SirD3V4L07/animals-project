const path = require("path");
const express = require('express');
const pool = require("./db");
const app = express();
const PORT = 3000;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("frontend"));


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
      "SELECT common_name, scientific_name, phylum, \"order\" , \"class\" , family, genus, avg_weight, avg_speed, life_expectancy, legacy_start, legacy_end, diet FROM animals_tb WHERE slug = $1",
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Animal not found");
    }

    res.render("animal", { animal: result.rows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }

});

app.listen(PORT, () => {
	console.log(`API running on port ${PORT}`);
});
