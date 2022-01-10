const express = require("express")
const app = express()


const bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require("./db/connection")

app.use("/user", require("./router/user"))
app.use("/admin", require("./router/admin"))
app.use("", require("./router"))

const verifyToken = require("./middleware/verifyToken")
const { updateResumeUser, getResumeByID, insertResume, addResumeToJob, getResumeFromJob } = require("./db/user/resume")
const { getJobByID } = require("./db/job")
const isExist = require("./service/util/array")
const replacer = require("./service/util/arrayToUser")

app.get("/user/dashboard/check/:job_id", verifyToken, async (req, res) => {
    const { job_id } = req.params
    const { id: user_id } = req.body
    const resultJob = (await getJobByID(job_id)).rows[0]
    if (user_id != resultJob.user_id) {
        return res.json({ success: false, message: "permission denied ! " })
    }
    const users = await replacer(resultJob.resume_id)
    if (!users) {
        return res.json({ success: true, users: "not yet sended resume !" })
    }
    res.json({ success: true, users })
})




app.listen(port = 3000, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})