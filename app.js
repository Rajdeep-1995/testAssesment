const express = require("express");
const app = express();
const { readdirSync } = require("fs");

app.use(express.json());

readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

app.get("/api/ping", (req, res) => {
  res.status(200).json({ success: true });
});

module.exports = app;
