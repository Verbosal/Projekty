import express from "express";
const router = express.Router();

router.post("/create", async (req, res) => {
  var params = req.body
  databaseFunctions.addPost(databaseFunctions.fetchUserId(params.username), params.title, params.content);
  console.log("New post!");

  res.render("index");
});

export default router;