const express = require("express")
const app = express()


const bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require("./db/connection")

const { createJobQueue } = require("./db/user")


app.use("/user", require("./router/user"))


app.post("/user/dashboard/create", async (req, res) => {
    try {
        const { title, description } = req.body
        const user_id = 37
        const result = await createJobQueue(user_id, title, description)
        if (result == false) {
            return res.json({ success: false, error: "user id not found !" })
        }
        if (result.rowCount == 1) {
            res.json({ success: true, message: "job create and wait for admin to accept ..." })
        } else {
            res.json({ success: false, message: "job didnt create" })
        }
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

app.listen(port = 3000, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})