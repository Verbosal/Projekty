import express from "express";
import databaseFunctions from "./database/functions.js";
//import bcrypt from "bcrypt";
//import session from "express-session";

const port = 8000;
const app = express();

app.set('views', './public');
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/login", async (req, res) => {
  var params = req.body
  databaseFunctions.login(params.title, params.content);

  res.render("index");
});

app.post("/createAccount", async (req, res) => {
  var params = req.body
  databaseFunctions.addUser(params.login, params.password);

  res.render("index");
});

app.post("/createPost", async (req, res) => {
  var params = req.body
  //databaseFunctions.addPost(userId, params.title, params.content);

  res.render("index");
});

app.all("/", async (req, res) => {
  res.render("index", {posts : databaseFunctions.fetchPosts()});
});


app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});