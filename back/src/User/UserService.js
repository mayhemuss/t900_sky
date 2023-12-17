import User from './User.js';
import bcrypt from 'bcryptjs';
import {validationResult} from 'express-validator';
import jwt from 'jsonwebtoken';
import config from '../config.js';

const generateAccessToken = (id, name) => {
  const payload = {id, name};
  return jwt.sign(payload, config.secret, {expiresIn: '24h'});
};


class UserService {
  async registration(req) {
    const {userName, password,email, groups} = req.body
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new Error(JSON.stringify(errors));
    }
    const candidateUser = await User.findOne({userName});
    if (candidateUser) {
      throw new Error('имя пользователя занято');
    }
    const candidateEmail = await User.findOne({email});
    if (candidateEmail) {
      throw new Error('почта занята');
    }

    const hashPassword = bcrypt.hashSync(password, 7);

    const user = new User({
      userName,
      password: hashPassword,
      email,
      groups,
    });
    await user.save();

    return {message: 'зарегано'};
  }

  async login(userName, password) {
    const user = await User.findOne({userName});
    if (!user) {
      throw new Error('пользователь не существует');
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      throw new Error('пароль не правильный');
    }
    const token = generateAccessToken(user._id, user.userName);
    return token;
  }



  async searchUsers(name) {
    const users = await User.find({userName: {$regex: name}}, {
      userName: 1,
      _id: 1,
    }).limit(10);
    if (users.length < 1) {
      return {message: 'не найдены'};
    }
    return {users: users};
  }
}

export default new UserService();
