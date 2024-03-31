import { Router } from "express";
import monterController from "../controllers/monter.js";
// import MonterController from "../controllers/monter.controller";

const monterRouter = new Router()

monterRouter.post('/visit', monterController.createMonter)



export default monterRouter