import { comparePassword, hashPassword } from "../Helpers/authHelper.js";
import userModel from "../Models/userModel.js";
import JWT from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone ,answer} = req.body;
    //Validation
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "E-mail is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is required" });
    }

    // Existing User
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(200).send({
        success: false,
        message: "User Already registered",
      });
    }

    //Hashing Password use
    const hashedPassword = await hashPassword(password);

    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      answer
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user:{
        name:user.name,
        email:user.email,
        phone:user.phone,
        
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in register",
      error,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Credientials",
      });
    }
    ///Check user email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "E-mail is not registered",
      });
    }
    //Check Password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
      
    }
    // token //Local storage
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    res.status(200).send({
      success:true,
      message:"Login Successfully",
      user:{
        name:user.name,
        email:user.email,
        phone:user.phone,
        password:user.password,
        role:user.role
      },
      token,
    });



  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};


export const testRoutes =async (req,res)=>{
  try {
    res.send({
      success:true,
      message:"Successfull midleware working"
    })
  } catch (error) {
    res.send({
      success:false,
      message:"middleware error"
    })

    console.log(error);
  }
}

export const forgetPassword=async(req,res)=>{
try {
  const {email,newPassword,answer}=req.body
  //Validation
  if(!email){
    res.status(400).send({
      message:"E-mail is required"
    })
  }
  if(!answer){
    res.status(400).send({
      message:"Answer is required ."
    })
  }
  if(!newPassword){
    res.status(400).send({
      message:"New Password is required"
    })
  }
  const user=await userModel.findOne({email,answer})
  if(!user){
    return res.status(404).send({
      success:false,
      message:"Something went wrong"
    })
  }
  const hashed= await hashPassword(newPassword) //new Password hashed
  // await userModel.findById(user._id,{password:hashed})
  user.password = hashed; // Update the user's password
  await user.save();   //Data updated
  res.status(200).send({
    success:true,
    message:"Password reset Successfully"
  })
  

} catch (error) {
  console.log("The error in forget password is",error);
  res.status(500).send({
    success:false,
    message:"Something went wrong"
  })
}



}