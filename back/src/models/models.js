import { DataTypes } from "sequelize";
import db from "../db.js";

 const Monter = db.define('monter',
{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name:{type: DataTypes.STRING, unique:true,allowNull:false}
})

 const Home = db.define("home", {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name:{type: DataTypes.STRING, unique:true, allowNull:false},
    region:{type: DataTypes.STRING, },
    numberOfEntrance:{type: DataTypes.STRING, },
    numbOfFloors:{type: DataTypes.STRING, },
    apartmentsCount:{type: DataTypes.STRING,},

})

 const Entrance = db.define("entrance",{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    number:{type: DataTypes.STRING, allowNull:false},
})

 const Visit = db.define("visit",{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
date :{type: DataTypes.STRING, allowNull:false},
shieldsOk :{type: DataTypes.STRING, },
shieldsNew :{type: DataTypes.STRING, },
shieldsReNew :{type: DataTypes.STRING,},
mirrorOk :{type: DataTypes.STRING, },
mirrorNew :{type: DataTypes.STRING, },
mirrorReNew :{type: DataTypes.STRING, },
stand :{type: DataTypes.STRING, },
a4 :{type: DataTypes.STRING, },
})


Monter.hasMany(Home)
Home.belongsTo(Monter)

Home.hasMany(Entrance)
Entrance.belongsTo(Home)

Entrance.hasMany(Visit)
Visit.belongsTo(Entrance)

export  {Monter , Home , Entrance , Visit}

