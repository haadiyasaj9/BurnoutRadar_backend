const express = require("express");
const cors = require("cors");
const supabase = require("./config/supabaseClient");
const entryRoutes = require("./routes/entryRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/entries", entryRoutes);
app.use("/api/dashboard", dashboardRoutes);

// root test
app.get("/", (req, res) => {
  res.send("Burnout Radar Backend Running");
});

// database test route
app.get("/test-db", async (req, res) => {
  const { data, error } = await supabase
    .from("entries")
    .select("*")
    .limit(1);

  if (error) return res.json(error);

  res.json(data);
});

module.exports = app;