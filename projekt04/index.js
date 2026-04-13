const environment = process.env //Attached environment file
const port = environment.PORT;

if (port === undefined) { //Check for environment file
  console.error(
    `Environment file not attached.
    Please use the correct command provided in the README.`,
  );
  process.exit(1);
}

//Imports
import express from "express";
import databaseFunctions from "./database/functions.js";
import session from "./login/session.js";

// Constants
const app = express();
app.set('views', './public');
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.post("/createAccount", async (req, res) => {
  var params = req.body
  var createAccount = await databaseFunctions.addUser(params.username, params.password);

  if (createAccount.successful == true) {
        console.log("Account created account successful!");
  } else {
        console.log("Account creation failed!");

        if (createAccount.reason.errno == 19) {
          console.log("This was because another account with the same username already exists");
        }
  };

  res.render("index", {errorMessage : createAccount});
});

app.post("/login", async (req, res) => {
  var params = req.body
  var result = await databaseFunctions.login(params.username, params.password);

  if (result.successful) {
        console.log("Login attempt successful!");
        session.createSession(params.username, res);
  } else {
        console.log("Login attempt failed!");
  };

  res.render("index", {login : result, posts : await databaseFunctions.fetchPosts()});
});

app.get("/logout", async (req, res) => {
  databaseFunctions.logout(res.locals.user);

  res.redirect("/");
});

app.post("/createPost", async (req, res) => {
  var params = req.body
  databaseFunctions.addPost(databaseFunctions.fetchUserId(params.username), params.title, params.content);
  console.log("New post!");

  res.render("index");
});

app.all("/", (req, res)=>{
  res.render("index");
});

// Optional operations before running the website
let operations = {
  [environment.CLEAR_DB] : databaseFunctions.clear, // Reset the database
  [environment.POPULATE_DB] : databaseFunctions.populate, // Populate with examples
  [environment.CREATE_ADMINS] : databaseFunctions.createAdmins // Create admin(s)
}

// Execute before 
for (let [check, operation] of Object.entries(operations)) {
  if (Boolean(check)) {
    operation()
  }
}

// Start hosting
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

// the worst thing about commenting is that it makes you look like a clanker 😭 which I AM NOT
// lmao Why does code support emojis