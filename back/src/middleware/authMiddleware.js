import jwt from 'jsonwebtoken';
import config from '../config.js';

const authMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      res.status(403).json({ message: 'пользователь не авторизован' });
    }
    const decodetData = jwt.verify(token, config.secret);


    req.user = decodetData;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: 'пользователь не авторизован' });
  }
};

export default authMiddleware;
