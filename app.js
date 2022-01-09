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
const { updateResumeUser, getResumeByID, insertResume } = require("./db/user/resume")
const { getJobByID } = require("./db/job")

app.post("/user/dashboard/:job_id/resume", verifyToken, (req, res) => {
    const { id: user_id } = req.body
    const { job_id } = req.params
    const job = await getJobByID(job_id)
    if (job.rowCount == 0 || !job) {
        return res.json({ success: false, message: "job not found !" })
    }






    res.json({ job_id, user_id })

})



app.listen(port = 3000, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})