const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    apartment:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
},{
    timestamps:true
});

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;