const express = require("express");
const route = express.Router();
const adminController = require("../Controllers/adminController");
route.post("/login", adminController.adminLogin);
route.post("/usercreation", adminController.createUser);
route.get("/showuserdata", adminController.showUserData);
route.post("/assigntask", adminController.assignTask);
 route.get("/taskdetail", adminController.taskDetail);
 route.get("/changetaskstatus", adminController.changeTaskStatus);
 route.get('/test',adminController.pagination)
 route.get('/deletetask',adminController.deleteTask)




module.exports = route;
