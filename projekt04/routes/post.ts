import express from "express";
const router = express.Router();

// import * as posts from "../database/functions/post.ts";
// import * as account from "../database/functions/user.ts";

router.post("/create", async (req : express.Request, res : express.Response) => {
  var params = req.body
  posts.create(1, params.title, params.content);
  console.log("New post!");

  res.render("index");
});

export default router;