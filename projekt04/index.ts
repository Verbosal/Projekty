// Initialization

// Express setup
import config from "./config.ts";
import express from "express";
const app = express();

// Setters
app.set("view engine", "ejs");
app.set('views', './public');

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes attachment
import "./routes/route.ts";

// Optional operations
config.runOperations && import("./database/functions/operations.ts");

// Start hosting
app.listen(config.port, () => {
  console.log(`Server listening on http://localhost:${config.port}`);
});