import express from "express";
const router = express.Router();

router.all("/", (req : express.Request, res : express.Response) => {
  res.render("index");
});

export default router;