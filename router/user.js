const express = require("express")
const app = express()


const controller = require("../controller/user")



app.post("/singup", controller.signup)
app.post("/login", controller.login)


module.exports = app