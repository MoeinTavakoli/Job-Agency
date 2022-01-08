const express = require("express")
const app = express()


const bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


require("./db/connection")

app.use("/user", require("./router/user"))


app.listen(port = 3000, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})