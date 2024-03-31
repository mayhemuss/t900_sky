import express from 'express';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import UserRouter from './User/UserRouter.js';
// import router from './routes/router.js'

import cors from 'cors';
//import {ConnectionOptions} from "tls";
import HomeRouter from "./Home/HomeRouter.js";
import monterRouter from './routes/monterRouter.js';

// const DB_URL = 'mongodb://192.168.0.101:27017/t900';
const PORT = 5000;
const BACK_URL = '192.168.0.74';

const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'http://192.168.0.101:3000', '*'],
  critical: true,
}));
// app.use(express.bodyParser({limit: '50mb'}));
app.use(express.json({limit:'70mb'})); //возможность вставлять джейсон на прямую
app.use(express.static('static')); //отдавать картинки
app.use(fileUpload({})); //возможность вставлять картинки

app.use('/api', monterRouter)
// app.use('/api', UserRouter);
// app.use('/api', HomeRouter);
// app.use('/api', PaymentRouter);

async function startApp() {
  try {
    
    app.listen(PORT, BACK_URL, () =>
      console.log(`server start at https://${BACK_URL}:${PORT}`),
    );
  } catch (error) {
    console.log(error);
  }
}

startApp();
