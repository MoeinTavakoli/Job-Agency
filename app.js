const express = require("express")
const app = express()


const bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


require("./db/connection")

const { signup, getdb } = require("./db/user")

app.post("/user/signup", async (req, res) => {
    try {
        const { name, skill, education, username, password } = req.body

        const result = await signup(name, skill, education, username, password)
        if (result == false) {
            return res.json({ success: false, message: "user is exist !" })
        }
        return res.json({ success: true, message: "user successfuly added ..." })
    } catch (error) {
        console.log(error);
        res.json({ error })
    }
})


app.listen(port = 3000, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})