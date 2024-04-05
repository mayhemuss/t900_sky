import Router from "express"

import monterController from "../controllers/monterController.js";

const monterRouter = new Router()

monterRouter.get("/", monterController.getAllMonter)

monterRouter.patch("/", monterController.patchMonter)
monterRouter.get("/monters", monterController.montersAllVisits)

monterRouter.get("/mont", monterController.montersDateVisits)

export {monterRouter}
