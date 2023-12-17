import UserService from './UserService.js';
import userService from './UserService.js';
import jwt from 'jsonwebtoken';
import config from '../config.js';

class UserController {
  async registration(req, res) {
    // console.log(req);
    try {
      const { userName, password } = req.body;
      const newUser = await UserService.registration(req);
      return res.json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { userName, password } = req.body;
      const token = await UserService.login(userName, password);
      return res.json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }



  async searchUsers(req, res) {
    try {
      const search = req.body.userName;
      const Users = await userService.searchUsers(search);
      return res.json(Users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

}

export default new UserController();
