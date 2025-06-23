const adminModel = require("../Models/adminModel");
const userModel = require('../Models/userModel');
 const taskModel = require('../Models/taskModel')
const userPass = require('../Middleware/randomPass')
const nodeMailer=require('../Middleware/nodemailer')

const adminLogin = async (req, res) => {

  const { email, password } = req.body;
console.log(req.body)
   try {

  
    const admin = await adminModel.findOne({ email });

    if (!admin) {
      return res.status(401).send({ msg: "Invalid Email" });
    }

    if (admin.password !== password) {
      return res.status(401).send({ msg: "Invalid Password" });
    }

    return res.status(200).send({
      admin: admin,
      msg: "Login Successfully!",
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).send({ msg: "Server Error" });
  }
};

 const createUser=async(req, res)=>{
   
  
   const { name, email, designation } = req.body;
   

       console.log(req.body);
   
   const UserPass = userPass();
   console.log(UserPass)
    const user =  await userModel.create({
      name: name,
      email:email,
      designation: designation,
      password: UserPass
    })


       await nodeMailer(name,email, UserPass);
        res.send({data:user})
 
  }

    
const showUserData = async (req, res) => {

  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit || 5);
  try { 
    const User = await userModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit);

      
      const total = await userModel.countDocuments();
    res.status(201).send({
      data: User, 
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.log(error);
  }
};

const assignTask = async (req, res) => {

  

   const { title, description, complday, userid } = req.body;
  console.log(req.body)

  
  try {
    const Task = await taskModel.create({
      title: title,
      description: description,
      compday: complday,
      userid: userid,
    });
    res.status(201).send({ msg: "User Task Succesfully Assign!",Task });
  } catch (error) {
    console.log(error);
  }
};




   const taskDetail = async(req, res)=>{

    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 5);

    try {
      
        const Task = await taskModel.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('userid');

        const total = await taskModel.countDocuments();
        res.status(200).send( {
          data:Task,
          total,
          currentPage: page,
          totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
      console.log(error);
      
    }
   }

      const changeTaskStatus=async(req, res)=>{
        const {id} = req.query;
        console.log(req.query);
        
        try {
          
          const Task = await taskModel.findByIdAndUpdate(id, {
            taskstatus:false
          })
        } catch (error) {
          console.log(error);
          
        }
      }

      const pagination=async(req,res)=>{

         const page=parseInt(req.query.page || 1)
         const limit=parseInt(req.query.limit || 5)
         const now = new Date();

         const task=await taskModel.find()
        
           .skip((page - 1) * limit)
           .limit(limit);

         const total=await taskModel.countDocuments()
         const user=await taskModel.find().populate('userid')
         console.log(user)

         res.send({
          task,
          total,
          currentPage:page,
          totalPages:Math.ceil(total/limit),
          user
         })
      }


      const deleteTask=async(req,res)=>{

         const{id}=req.query

         await taskModel.findByIdAndDelete(id)
         res.send('task is deleted ')
      }

module.exports = {
  adminLogin,
  createUser,
  showUserData,
  assignTask,
  taskDetail,
  changeTaskStatus,
  pagination,
  deleteTask
};
