const JWT = require ("jsonwebtoken");

module.exports = async (req,res,next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.JSW_SECRET,(err,decode) =>{
      if(err){
        return res.status(401).send({
          message:"auth failed",
          success:false
        });
          }
      else{
        req.body.userId = decode.userId;
        next();
      }
    })
  } catch (e) {
    console.log(e);
    return res.status(401).send({
      message:"auth failed",
      success:false,
      e
    })
  }
}
