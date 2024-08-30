const express = require("express");
const router = express.Router();
const { fetchPerkpp } = require("../queries/queryPenerimaan");

// Route untuk halaman utama
router.get("/", async (req, res) => {
  try {
    const data = await fetchPerkpp();
    res.render("index", { data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error connecting to the database");
  }
});

module.exports = router;
