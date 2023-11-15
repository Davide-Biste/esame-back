import { Router } from "express";
import entity from "./entity/index.js";

const router = new Router();

router.use(entity);


export default router;
