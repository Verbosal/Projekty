import express from "express";
import databaseFunctions from "./database/functions.js";
import session from "./login/session.js";

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

  res.render("index", {errorMessage : createAccount});
});

app.post("/login", async (req, res) => {
  var params = req.body
  
  var result = await databaseFunctions.login(params.username, params.password);

  if (result.successful) {
        console.log(`Logged in!
        Username: ${params.username}
        Passhash: ${params.password}`);

        session.createSession(params.username, res);
  } else {
        console.log(`Log in failed!
        Username: ${params.username}
        Passhash: ${params.password}`);
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

  console.log(`New post!
  Title: ${params.title}
  Content: ${params.content}`);

  res.render("index");
});

app.all("/", (req, res)=>{
  res.render("index");
});

databaseFunctions.clear();

import populate from "./database/populate.js";
if (Boolean(process.env.POPULATE_DB)) {
  populate();
};

import admin from "./database/admin.json" with { type: "json" };
databaseFunctions.addUser(admin.username, admin.password);
databaseFunctions.grantAdmin(await databaseFunctions.fetchUserId(admin.username));


app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});