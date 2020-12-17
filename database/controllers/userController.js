const User = require("../models/user");
const bcrypt = require("bcryptjs");
const constants = require("../constant");


exports.index = async (req, res, next) => {
  const user = await User.findOne();

  res.status(200).json({
    data: user,
  });
};

// login Chanel
exports.login = async (req, res, next) =>{
    // console.log("hello login")
  console.log("login: " + JSON.stringify(req.body));
  const{username, password} = req.body;
  const result = await User.findOne({username: req.body.username})

  try{       

    if (result){
      if(bcrypt.compareSync(password, result.password)){
         res.json({result: constants.kResultOk, message: JSON.stringify(result)})
      }else{
         res.json({result: constants.kResultNok, message: "Invalid password"} )        
      }
    }else{
     res.json({result: constants.kResultNok, message: "Invalid username"} )   
    }       
 }catch(error){
    res.json({result: constants.kResultNok, message: JSON.stringify(error)} )

}
}

// register
exports.register = async (req, res, next) =>{
    try {
        console.log("register: " + JSON.stringify(req.body));
        req.body.password = await bcrypt.hash(req.body.password, 8);
    
        const result = await User.create(req.body);
        res.json({ result: constants.kResultOk, message: JSON.stringify(result) });
      } catch (error) {
        res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
      }
}

