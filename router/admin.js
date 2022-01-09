const express = require("express")
const app = express()

const controller = require("../controller/admin")
const verifyToken = require("../middleware/verifyToken")
const queueCtl = require("../controller/admin/queue")
const jobCtl = require("../controller/admin/job")

app.post("/signup", controller.signup)
app.post("/login", controller.login)
app.get("/dashboard/queue", verifyToken, queueCtl.getQueue)
app.delete("/dashboard/queue", verifyToken, queueCtl.removeQueue)
app.post("/dashboard/queue", verifyToken, jobCtl.createJobCtl)
app.put("/admin/dashboard/job/:job_id", verifyToken, jobCtl.editJob)


module.exports = app