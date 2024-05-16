import Router from "express"
import visitController from "../controllers/visitController.js";

const visitRouter = new Router()

visitRouter.get("/visits", visitController.getOneEntranceVisits)
visitRouter.get("/visit", visitController.getDateVisits)
visitRouter.get("/maxmin", visitController.getMaxMinDateVisits)
visitRouter.get("/allvisit", visitController.Allvisits)

export {visitRouter}
