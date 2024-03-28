import mongoose from "mongoose";

const AddressEntranceList = new mongoose.Schema({
  address:{type:String, required: true},
  numberOfEntrance: {type:String},
  name:{type: String}
});

export default mongoose.model("AddressEntranceList", AddressEntranceList);
