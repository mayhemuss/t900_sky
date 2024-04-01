import { Router } from "express";
import monterController from "../controllers/monter.js";
import {monterRouter} from "./monterRouter.js"
// import MonterController from "../controllers/monter.controller";

const router = new Router()

router.use('/monter', monterRouter)



export default router