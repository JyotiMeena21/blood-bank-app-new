const mongoose = require('mongoose');
const userModel = require ("../models/userModel");
const inventoryModel = require("../models/inventoryModel");

const createInventoryController = async(req,res) => {
  try {
    const {email,inventoryType} =req.body;

    const user = await userModel.findOne({email});
    if(!user){
      // return res.status(404).send({
      //  message:"user not found ",
      //  success:false,
        throw new Error("not1 a donar")
      }

    // if (inventoryType == "in" && user.role !=="donar") {
    //   throw new Error("not a donar")
    //   }


  if(req.body.inventoryType== "out"){
    const requestedBloodGroup = req.body.bloodGroup;
    const requestedQuantityOfBlood = req.body.quantity;
    const organisation= new mongoose.Types.ObjectId;
  }

     const inventory = new inventoryModel(req.body);
     await inventory.save()
     return res.status(201).send({
       message:"successfully inventory is saved",
       success:true
     })


  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message:"error in creating inventory",
      success:false,
      e
    })

  }
}





//getInventoryController


const getInventoryController = async(req,res) => {
  try {
    const inventory  = await inventoryModel.find({organisation:req.body.userId})
    .populate("donar")
    .populate("hospital")
    .sort({createdAt: -1});
    return res.status(200).send({
      success:true,
      message:"get all record successfully",
      inventory
    })
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message:"error in get inventory",
      success:false,
      e
    })
  }
}

module.exports = {createInventoryController, getInventoryController};
