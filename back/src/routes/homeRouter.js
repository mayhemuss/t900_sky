import Router from "express"
import homeController from "../controllers/homeController.js";



const homeRouter = new Router()

homeRouter.get("/homes",        homeController.getAllHome)
homeRouter.get("/home", homeController.getAllHomeMonters)
homeRouter.patch("/home", homeController.patchHome)

export {homeRouter}
