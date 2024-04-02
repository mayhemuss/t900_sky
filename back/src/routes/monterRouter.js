

import Router from "express"
import monterController from "../controllers/monterController.js";

 const monterRouter = new Router()

 monterRouter.post("/create", monterController.createMonter)


 export {monterRouter}
