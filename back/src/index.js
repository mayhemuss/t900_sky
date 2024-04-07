import express from 'express';
// import {Monter , Home , Entrance , Visit} from "./models/models.js"
import fileUpload from 'express-fileupload';
// import UserRouter from './User/UserRouter.js';
import cors from 'cors';

import router from './routes/index.js';
import dotenv from "dotenv"
import ErrorMidleware from './middleware/ErrorMidleware.js';


import db from "./db.js"

dotenv.config()


const PORT = 5000
// process.env.PORT || 5000;

const BACK_URL = '192.168.0.74';

const app = express();
const corsOption ={
  origin: ['http://localhost:3000',
    'http://192.168.0.101:3000',
    'http://192.168.0.74:3000',
    'https://frontdev.mayhemus.keenetic.pro/',
    'http://frontdev.mayhemus.keenetic.pro/',
    '*'],
  optionsSuccessStatus: 200,
  critical: true,
}

// app.use(function (req, res, next) {
//   const origins = ['http://localhost:3000',
//     'http://192.168.0.101:3000',
//     'https://frontdev.mayhemus.keenetic.pro/',
//     'http://frontdev.mayhemus.keenetic.pro/',
//     '*']
//
//   for(let i = 0; i < origins.length; i++){
//     const origin = origins[i];
//
//     if(req.headers.origin.indexOf(origin) > -1){
//       res.header('Access-Control-Allow-Origin', req.headers.origin);
//     }
//   }
//
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(cors());
// app.use(express.bodyParser({limit: '50mb'}));
app.use(express.json({limit: '70mb'})); //возможность вставлять джейсон на прямую
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
