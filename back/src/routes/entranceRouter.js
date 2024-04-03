import Router from "express"
import entranceController from "../controllers/entranceController.js";




const entranceRouter = new Router()

entranceRouter.get("/entrance", entranceController.getHomeEntrance)


export {entranceRouter}
