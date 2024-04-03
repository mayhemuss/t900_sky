import { Router } from "express";
import {importFileRouter} from "./importFileRouter.js";
import {monterRouter} from "./monterRouter.js";
import {homeRouter} from "./homeRouter.js";
import {entranceRouter} from "./entranceRouter.js";
import {visitRouter} from "./visitRouter.js";


const router = new Router()

router.use('/visits', importFileRouter)
router.use('/monters', monterRouter)
router.use('/home', homeRouter)
router.use('/entrance', entranceRouter)
router.use('/visit', visitRouter)

export default router
