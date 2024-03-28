import express, {Router} from "express";
 import HomeController from "./HomeController.js";
import {check} from "express-validator";
import authMiddleware from "../middleware/authMiddleware.js";

// @ts-ignore:next-line
const HomeRouter = new Router() ;

HomeRouter.post(
  "/home",
  // authMiddleware,
  HomeController.addVisits);

 HomeRouter.get("/home",
   // authMiddleware,
   HomeController.getMonterAddress)

HomeRouter.get("/entrance",
  // authMiddleware,
  HomeController.getOneEntrance)

HomeRouter.get("/address",
  // authMiddleware,
  HomeController.getAddressEntranceList)

 HomeRouter.get("/monter",
   // authMiddleware,
   HomeController.getAllMonter)

export default HomeRouter;
