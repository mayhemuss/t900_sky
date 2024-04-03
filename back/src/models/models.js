import {DataTypes} from "sequelize";
import db from "../db.js";

const Monter = db.define('monter',
  {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
  })

const Home = db.define("home", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  address: {type: DataTypes.STRING, unique: true, allowNull: false},
  region: {type: DataTypes.STRING,},
  numbOfFloors: {type: DataTypes.STRING,},
  apartmentsCount: {type: DataTypes.STRING,},

})

const Entrance = db.define("entrance", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  numberOfEntrance: {type: DataTypes.STRING || DataTypes.INTEGER, allowNull: false},
})

const Visit = db.define("visit", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  date: {type: DataTypes.STRING, allowNull: false},
  comments: {type: DataTypes.STRING || DataTypes.INTEGER,},
  shieldsOk: {type: DataTypes.STRING || DataTypes.INTEGER,},
  shieldsNew: {type: DataTypes.STRING || DataTypes.INTEGER,},
  shieldsReNew: {type: DataTypes.STRING || DataTypes.INTEGER,},
  mirrorOk: {type: DataTypes.STRING || DataTypes.INTEGER,},
  mirrorNew: {type: DataTypes.STRING || DataTypes.INTEGER,},
  mirrorReNew: {type: DataTypes.STRING || DataTypes.INTEGER,},
  stand: {type: DataTypes.STRING || DataTypes.INTEGER,},
  a4: {type: DataTypes.STRING || DataTypes.INTEGER,},
})


Monter.hasMany(Home)
Home.belongsTo(Monter)

Home.hasMany(Entrance)
Entrance.belongsTo(Home)

Entrance.hasMany(Visit)
Visit.belongsTo(Entrance)

Monter.hasMany(Visit)
Visit.belongsTo(Monter)

export {Monter, Home, Entrance, Visit}

