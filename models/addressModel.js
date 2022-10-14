const mongoose = require("mongoose")


//model schema  on how iam saving the user details
let AddressSchema  = new mongoose.Schema({
    firstName:{
        type:String
    },
    secondName:{
        type:String
    },
    phone:{
        type:Number
    },
    accessToken:{
        type:String
    },
    address:[{
        houseNo:{
            type:String
        },
        street:{
            type:String
        },
        district:{
            type:String
        },
        state:{
            type:String
        }
    }],
  
});

///defining the  my schema into the data base
const Address = mongoose.model("Address",AddressSchema,"Address")
module.exports = Address //exporting the collection to use in other places..