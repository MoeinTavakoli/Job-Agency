const express = require("express")
const app = express()


const controller = require("../controller/user")
const verifyToken = require("../middleware/verifyToken")


app.post("/singup", controller.signup)
app.post("/login", controller.login)
app.post("/dashboard/create", verifyToken, controller.createJob)
app.put("/dashboard/resume", verifyToken, controller.upsertResume)


module.exports = app