const mongoose = require('mongoose');


const inventorySchema = new mongoose.Schema({
  inventoryType:{
    type:String,
    required:[true,"inventory type is required"],
    enum:["in","out"]
  },
  bloodGroup:{
    type:String,
    required:[true,"blood group is required"],
    enum:["O+","A+","A-","O-","B+","B-","AB-","AB+"]
  },
  quantity:{
    type:String,
    required:[true,"quantity is required"]
  },
  donarEmail:{
    type:String,
    required:[true,"donar Email is required"]
  },
  organisation:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:[true,"organisation is required"]
  },
  hospital:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required: function(){
                        if (this.inventoryType === "out"){
                          return true;
                        }
                      else{
                        return false;
                      }
              },
            },
    donar:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"users",
      // required: function(){
      //   if(this.inventoryType === "in"){
      //     return true;
      //   }
      //   else{
      //     return false;
      //   }
      // }
    }
}

,{timestamps:true});


module.exports = mongoose.model("Inventory",inventorySchema);
