const express = require("express")
const app = express()


const { signupDB, loginDB } = require("../../db/user")

async function signup(req, res) {
    try {
        const { name, skill, education, username, password } = req.body

        const result = await signupDB(name, skill, education, username, password)
        if (result == false) {
            return res.json({ success: false, message: "user is exist !" })
        }
        return res.json({ success: true, message: "user successfuly added ..." })
    } catch (error) {
        console.log(error);
        res.json({ error })
    }
}

async function login(req, res) {
    try {
        const { username, password } = req.body

        const result = await loginDB(username, password)

        if (result.length == 0 || result == false) {
            return res.json({ success: false, message: "username OR password wrong" })
        }

        return res.json({ success: true, message: "user successfuly added ..." })
    } catch (error) {
        console.log(error);
        res.json({ error })
    }
}





module.exports = {
    signup,
    login
}