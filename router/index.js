const express = require("express")
const app = express()

const controller = require("../controller/home")

app.get("/home", controller.home)
app.get("/home/:job_id", controller.jobByID)

module.exports = app