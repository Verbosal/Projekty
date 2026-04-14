const environment = process.env // Attached environment file
const port = environment.PORT;

if (port === undefined) { // Check for environment file
  console.error(
    `Environment file not attached.
Please use the correct command provided in the README.`,
  );
  process.exit(1);
}

// Imports & declarations
import express from "express";
const app = express();

// Setters
app.set('views', './public');
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes attachment
import main from "./routes/main.ts";
import post from "./routes/post.ts";
import account from "./routes/account.ts";

app.use("/", main);
app.use("/post", post);
app.use("/account", account);

// Optional operations before running the website
let operations = {
  [environment.CREATE_USERS] : "",
  [environment.CREATE_POSTS] : "",
  [environment.CREATE_ADMINS] : "",

  [environment.CLEAR_USERS] : "",
  [environment.CLEAR_POSTS] : "",
  [environment.CLEAR_ADMIN_PRIVILEGES] : ""
}

// Execute above operations
// for (let [check, operation] of Object.entries(operations)) {
//   if (Boolean(check)) {
//     operation()
//   }
// }

// Start hosting
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

// the worst thing about commenting is that it makes you look like a clanker 😭 which I AM NOT
// lmao Why does code support emojis
// język polski