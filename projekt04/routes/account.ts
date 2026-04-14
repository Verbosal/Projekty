import express from "express";
const router = express.Router();

router.post("/create", async (req, res) => {
  var params = req.body
  var createAccount = await databaseFunctions.addUser(params.username, params.password);

  if (createAccount.successful === true) {
        console.log("Account created account successful!");
  } else {
        console.log("Account creation failed!");

        if (createAccount.reason.errno === 19) {
          console.log("This was because another account with the same username already exists");
        }
  };

  res.render("index", {errorMessage : createAccount});
});

router.post("/login", async (req, res) => {
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

router.get("/logout", async (req, res) => {
  databaseFunctions.logout(res.locals.user);

  res.redirect("/");
});

export default router;