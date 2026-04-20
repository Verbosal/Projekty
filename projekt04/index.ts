// Express setup
import express from "express";
const app = express();

// Setters
app.set('views', './public');
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes attachment
// Imports
import main from "./routes/main.ts";
import post from "./routes/post.ts";
import account from "./routes/account.ts";

// Router usages
for (let [path, router] of Object.entries({
  "/" : main,
  "/post" : post,
  "/account" : account
})) {
  app.use(path, router);
}

// Optional operations before running the website
import config from "./config.ts";
let optionals = config.optional;
let createOperations = optionals.create;
let clearOperations = optionals.clear;

let operations = {
  [createOperations.users] : "",
  [createOperations.posts] : "",
  [createOperations.admins] : "",

  [clearOperations.users] : "",
  [clearOperations.posts] : "",
  [clearOperations.admin_privileges] : ""
}

// Execute above operations
for (let [check, operation] of Object.entries(operations)) {
  if (Boolean(check)) {
    //operation()
  }
}

// Start hosting
const port = config.port;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

// the worst thing about writing actual documentation is that it makes you look like a clanker 😭 which I AM NOT
// lmao Why does code support emojis
// język polski