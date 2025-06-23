const { default: axios } = require("axios");
const UserModel = require("../Models/userModel");
const taskModel = require("../Models/taskModel");


const userloginCheck = async (req, res) => {
  // console.log(req.body);
  // res.send('kkk')
  
  const { email, password } = req.body;
 

  try {
    const User = await UserModel.findOne({ email: email });
    if (!User) {
      res.status(401).send({ msg: "Invalid Email Id!" });
    }
    if (User.password != password) {
      res.status(401).send({ msg: "Invalid Password!" });
    }
    res.status(200).send({ msg: "Login Successfully!", User });
  } catch (error) {
    console.log(error);
  }
 };

  const userTaskList = async(req, res)=>{
      let {id} = req.query;

  
      try {
        
          const Task = await taskModel.find({userid: id});
         
          res.status(200).send(Task)
          
      } catch (error) {
        
        console.log(error);
        
      }
      
      
  }
  const TaskComplete=async(req, res)=>{
    const {id}= req.query;
   
  
    try {
           const Task= await taskModel.findByIdAndUpdate(id, {taskstatus:true});
           res.status(201).send({Task:Task, msg:"Succesfully Updated"});
    } catch (error) {
       console.log(error);
    }
  }

  const changePass=async(req,res)=>{
       
     const{id,newpass}=req.body

     await UserModel.findByIdAndUpdate(id,{
       password:newpass,
     });
     res.send('password change successfully')
  }

  const changeTaskStatus=async(req,res)=>{
       const{id}=req.query
       console.log(req.query)
       res.send('okk')
  }

module.exports = {
  userloginCheck,
  userTaskList,
  TaskComplete,
  changePass,
  changeTaskStatus
};
