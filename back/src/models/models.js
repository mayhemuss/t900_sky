import {DataTypes} from "sequelize";
import db from "../db.js";

const Monter = db.define('monter', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Home = db.define("home", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  address: {type: DataTypes.STRING, allowNull: false, unique: true},
  region: {type: DataTypes.STRING,},
  date:{type: DataTypes.STRING, },
  numbOfFloors: {type: DataTypes.STRING,},
  apartmentsCount: {type: DataTypes.STRING,},
  managerCompany: {type: DataTypes.STRING},
  idFromSky: {type: DataTypes.INTEGER || DataTypes.STRING, unique: true},
})

const Entrance = db.define("entrance", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  numberOfEntrance: {type: DataTypes.STRING || DataTypes.INTEGER, allowNull: false},
  comment: {type: DataTypes.TEXT || DataTypes.STRING,  },
})


const PercentInfiltrate = db.define("percentInfiltrate",{
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  infiltrate: {type: DataTypes.TEXT || DataTypes.STRING, allowNull: false},
  date: {type: DataTypes.STRING, allowNull: false},
})

const Visit = db.define("visit", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  date: {type: DataTypes.STRING, allowNull: false},
  comments: {type: DataTypes.TEXT || DataTypes.STRING,},
  shieldsOk: {type: DataTypes.STRING || DataTypes.INTEGER,},
  shieldsNew: {type: DataTypes.STRING || DataTypes.INTEGER,},
  shieldsReNew: {type: DataTypes.STRING || DataTypes.INTEGER,},
  mirrorOk: {type: DataTypes.STRING || DataTypes.INTEGER,},
  mirrorNew: {type: DataTypes.STRING || DataTypes.INTEGER,},
  mirrorReNew: {type: DataTypes.STRING || DataTypes.INTEGER,},
  stand: {type: DataTypes.STRING || DataTypes.INTEGER,},
  a4: {type: DataTypes.STRING || DataTypes.INTEGER,},
  addressTable: {type: DataTypes.STRING || DataTypes.INTEGER,},
  floorTable: {type: DataTypes.STRING || DataTypes.INTEGER,},
  videoTable: {type: DataTypes.STRING || DataTypes.INTEGER,},
})

const MonterHome = db.define("monter_home",{
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  monterId: {type: DataTypes.INTEGER},
  homeId: {type: DataTypes.INTEGER},
})

Home.hasMany(Entrance)
Entrance.belongsTo(Home)

Home.hasMany(PercentInfiltrate)
PercentInfiltrate.belongsTo(Home)

Entrance.hasMany(Visit)
Visit.belongsTo(Entrance)

Monter.hasMany(Visit)
Visit.belongsTo(Monter)


Home.hasMany(MonterHome)
MonterHome.belongsTo(Home)

Monter.hasMany(MonterHome)
MonterHome.belongsTo(Monter)
/*

MonterHome.hasMany(Monter)
Monter.belongsTo(MonterHome)*/

export {Monter,
  Home,
  Entrance,
  Visit,
  PercentInfiltrate ,
  MonterHome}

