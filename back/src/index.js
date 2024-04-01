import express from 'express';
import {Monter , Home , Entrance , Visit} from "./models/models.js"
import fileUpload from 'express-fileupload';
import UserRouter from './User/UserRouter.js';
import cors from 'cors';
import HomeRouter from "./Home/HomeRouter.js";
import router from './routes/index.js';
import dotenv from "dotenv"
import ErrorMidleware from './middleware/ErrorMidleware.js';



import db from "./db.js"
dotenv.config()


const PORT =process.env.PORT || 5000;

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

app.use('/api', router)

app.use(ErrorMidleware)


async function startApp() {
  try {
   await db.authenticate()

   await db.sync()
    app.listen(PORT, BACK_URL, () =>
      console.log(`server start at https://${BACK_URL}:${PORT}`),
    );
  } catch (error) {
    console.log(error);
  }
}

startApp();
