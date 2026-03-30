import express from "express";

import databaseFunctions from "./database/functions.js";
import session from "./login/session.js";
// import auth from "./login/auth.js";
// import user from "./login/user.js";

const port = process.env.PORT;
if (port == null) {
  console.error(
    `Environment file not attached.
    Please use the correct command provided in the README.`,
  );
  process.exit(1);
}

const app = express();

app.set('views', './public');
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// async function render(req, res) {
//   res.render("index");
// }

app.post("/createAccount", async (req, res) => {
  var params = req.body

  var createAccount = await databaseFunctions.addUser(params.username, params.password);

  if (createAccount.successful == true) {
        console.log(`Created account!
        Username: ${params.username}
        Passhash: ${params.password}`);
  } else {
        console.log(`Account creation failed!
        Reason: ${createAccount.reason}
        Username: ${params.username}
        Passhash: ${params.password}`);

        if (createAccount.reason.errno == 19) {
          console.log("This was because another account with the same username already exists");
        }
  };

  res.render("index");
});

app.post("/login", async (req, res) => {
  var params = req.body
  
  var logIntoAccount = await databaseFunctions.login(params.username, params.password);

  if (logIntoAccount.successful) {
        console.log(`Logged in!
        Username: ${params.username}
        Passhash: ${params.password}`);

        session.createSession(params.username, res);
  } else {
        console.log(`Log in failed!
        Username: ${params.username}
        Passhash: ${params.password}`);
  };

  res.render("index", {loggedIn : logIntoAccount.successful});
});

app.get("/logout", async (req, res) => {
  var params = req.body
  
  databaseFunctions.logout(params.username, params.password);

  res.render("index");
});

app.post("/createPost", async (req, res) => {
  var params = req.body
  databaseFunctions.addPost(1, params.title, params.content);

  res.render("index");
});

app.all("/", (req, res)=>{
  res.render("index", {posts : databaseFunctions.fetchPosts()});
});

databaseFunctions.clear();

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});