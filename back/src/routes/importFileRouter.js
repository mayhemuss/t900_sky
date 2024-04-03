

import Router from "express"
import importFileController from "../controllers/importFileController.js";

 const importFileRouter = new Router()

 importFileRouter.post("/addAll", importFileController.createMonter)


 export {importFileRouter}
