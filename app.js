const express = require("express")
const app = express()


const bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require("./db/connection")

const verifyToken = require("./middleware/verifyToken")
const { getQueueByID, removeQueueByID } = require("./db/queue")
const { getAllJob, getJobByID } = require("./db/job")


app.use("/user", require("./router/user"))
app.use("/admin", require("./router/admin"))
app.use("", require("./router"))


// app.get("/home", )

app.listen(port = 3000, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})