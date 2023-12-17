import mongoose from "mongoose";

const VisitList = new mongoose.Schema({
  address: {type: String, required: true},
  apartmentsCount: {type: String},
  numbOfFloors: {type: String},
  numberOfEntrance: {type: String, required: true},
  name: {type: String, required: true},
  comments: {type: String},
  date: {type: String},
  shieldsOk: {type: String},
  shieldsNew: {type: String},
  shieldsReNew: {type: String},
  mirrorOk: {type: String},
  mirrorNew: {type: String},
  mirrorReNew: {type: String},
  stand: {type: String},
  a4: {type: String},

});

export default mongoose.model("VisitList", VisitList);


