import { Router } from "express";
import {actions} from "./controller.js";

const router = new Router();

router.post("/user", actions.createUser);
router.post("/user/login", actions.login)

router.get("/entity", actions.getAllEntities)
router.post("/entity", actions.createEntityBackoffice)

router.post("/reserve/:userId/entity/:entityId", actions.postReservations)
router.get("/reservations/user/:userId", actions.getReservations)

export default router;

