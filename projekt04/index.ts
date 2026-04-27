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
import "./database/operations.ts";

// Start hosting
app.listen(config.port, () => {
  console.log(`Server listening on http://localhost:${config.port}`);
});

// the worst thing about writing actual documentation is that it makes you look like a clanker 😭 which I AM NOT
// lmao Why does code support emojis
// język polski