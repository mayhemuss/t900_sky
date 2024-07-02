import Router from "express"
import homeController from "../controllers/homeController.js";


const homeRouter = new Router()
homeRouter.post("/homes", homeController.createHomes)
homeRouter.post("/homemonter", homeController.homeMonterLink)
homeRouter.post("/check", homeController.homeCheck)
homeRouter.get("/homes", homeController.getAllHome)
homeRouter.get("/home", homeController.getAllHomeMonters)
homeRouter.patch("/home", homeController.patchHome)

export {homeRouter}
