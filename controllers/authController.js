const userModel=require("../models/userModel");
const bcryptjs = require('bcryptjs');
const jwt =require("jsonwebtoken");

const registerController =async(req,res)=>{

  try {
    const exisitngUser = await userModel.findOne({email:req.body.email})

    if(exisitngUser){
      return res.status(200).send({
        success:false,
        message:"user already exist"
      })
    }

//hashing password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password,salt);
    req.body.password=hashedPassword;


    const user = new userModel(req.body);
    await user.save();
    return res.status(201).send({
      message:"successfully created",
      success:true,
      user
    })

  } catch (e) {
    console.log(e)
    res.status(500).send({
      message:"error in registration",
      success:false,
      e

    })

  }
};
//
//login
const loginController =async(req,res)=>{
  try {
    const user = await userModel.findOne({email:req.body.email});
    //role
   if(user.role !== req.body.role){
     return res.status(500).send({
       message:"user role doesn't match",
       success:false
     })
   }



   if(user){
      const comparePassword = await bcryptjs.compare(req.body.password,user.password);

       if (comparePassword){
         const token = jwt.sign({userId: user._id},process.env.JSW_SECRET,{
           expiresIn: "1d"
         })
         return res.status(200).send({
           message:"Successfully Login ",
           success:true,
           token,
           user


         });
       }
       else{
         return res.status(500).send({
           message:" invalid password",
           success:false
         })
       }
    }
    else{
      return res.status(404).send({
        message:"user email not found",
        success:false
      })
    }


  } catch (e) {
    console.log("error in login");
    res.status(500).send({
      message:"cannot login",
      success:false,
      e
  })
}
}


//get
const currentUserController = async (req,res) => {
  try {
    const user = await userModel.findOne({_id:req.body.userId});
    return res.status(200).send({
      message:"user passed successfully",
      success:true,
      user
    })



  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message:"unable to get current user",
      success:false,
      e
    })
  }


}





module.exports = {registerController,loginController,currentUserController};
