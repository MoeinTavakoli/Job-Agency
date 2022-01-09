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


app.put("/user/dashboard/resume", verifyToken, async (req, res) => {
    const { message, id: user_id } = req.body

    const resultGet = await getResumeByID(user_id)
    if (resultGet.rowCount == 0) {
        // bayad insert beshe
        const resultInsert = await insertResume(user_id, message)
        if (resultInsert.rowCount == 0 || !resultInsert) {
            return res.json({ success: false, message: "resume didnt inserted !" })
        }
        return res.json({ success: true, message: "resume inserted !" })
    }
    else {
        const resultUpdate = await updateResumeUser(user_id, message)
        if (resultUpdate.rowCount == 0 || !resultUpdate) {
            return res.json({ success: false, message: "resume update failed !" })
        }
    }

    res.json({ success: true, message: "resume successfully updated" })

})



app.listen(port = 3000, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})