// app.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("./routes");

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "15mb" }));

// Routes
app.use("/api", routes);

// Test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Connect to database and run scheduled tasks
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
