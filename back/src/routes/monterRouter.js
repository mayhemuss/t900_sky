import Router from "express"

import monterController from "../controllers/monterController.js";

const monterRouter = new Router()

monterRouter.get("/", monterController.getAllMonter)

monterRouter.patch("/", monterController.patchMonter)

export {monterRouter}
