const express = require("express");
const route = express.Router();
const UserController = require("../controllers/UserController");

route.post("/login", UserController.userloginCheck);
route.get("/usertask", UserController.userTaskList);
route.get("/completetask", UserController.TaskComplete);
route.post('/chngpass',UserController.changePass)
route.get("/changeTaskStatus",UserController.changeTaskStatus);



module.exports = route;
