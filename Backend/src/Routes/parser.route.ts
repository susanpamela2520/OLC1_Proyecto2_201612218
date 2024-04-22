import { Router } from "express";
import parser from "../Controller/parser.controller";
//import image from "../controller/image.controller";
import tst from "../Controller/test.controller"
const router = Router();

//router.post("/image", image);

router.post("/test", tst);
router.post("/parser", parser);


export default router;