import express, {Request, Response} from "express";
const router = express.Router();

router.all("/", (req : Request, res : Response)=>{
  res.render("index");
});

export default router;