const express = require("express");
const path = require("path");
const indexRoutes = require("./routes/indexRoutes");

const app = express();
const port = 24001;

// Set view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));

// Gunakan rute dari file `indexRoutes.js`
app.use("/", indexRoutes);
// app.use("/perkpp", perkppRoutes);
// app.use("/persektor", persektorRoutes);

// Mulai server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
