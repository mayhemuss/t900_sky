import mongoose from "mongoose";

const MonterList = new mongoose.Schema({
  name:{type:String, required: true}
});

export default mongoose.model("MonterList", MonterList);
