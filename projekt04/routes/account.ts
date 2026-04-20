import express from "express";
const router = express.Router();

import "../database/statements.ts"

// import * as account from "../database/functions/user.ts";
// import * as session from "../database/functions/session.ts";
// import * as posts from "../database/functions/post.ts";

router.post("/create", (req : express.Request, res : express.Response) => {
  var params = req.body
  var createAccount = account.create(params.username, params.password);

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

router.post("/login", async (req : express.Request, res : express.Response) => {
  var params = req.body
  var result = await account.login(params.username, params.password);

  if (result.successful) {
        console.log("Login attempt successful!");
        session.create(params.username, res);
  } else {
        console.log("Login attempt failed!");
  };

  res.render("index", {login : result, posts : posts.fetchAll()});
});

router.get("/logout", (req : express.Request, res : express.Response) => {
  account.logout(res.locals.user);

  res.redirect("/");
});

export default router;