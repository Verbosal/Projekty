import express from "express";
const router = express.Router();

router.all("/", (req, res)=>{
  res.render("index");
});

export default router;