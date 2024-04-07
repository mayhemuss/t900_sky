// import express, {Router} from "express";
// import UserController from "./UserController.js";
// import {check} from "express-validator";
// import authMiddleware from "../middleware/authMiddleware.js";


// // @ts-ignore:next-line
// const UserRouter = new Router() ;

// UserRouter.post(
//   "/user",
//   [
//     check(
//       "userName",
//       "имя пользователя должно быть больше 5 и меньше 20 символов"
//     ).isLength({min: 5, max: 20}),
//     check(
//       "password",
//       "пароль должен быть больше 5 и меньше 20 символов"
//     ).isLength({min: 5, max: 20}),
//   ],
//   UserController.registration
// );
// UserRouter.post("/login", UserController.login);

// UserRouter.get("/users",
//   // authMiddleware,
//   UserController.searchUsers);

// // UserRouter.delete("/user/:id", UserController.delete);

// export default UserRouter;
