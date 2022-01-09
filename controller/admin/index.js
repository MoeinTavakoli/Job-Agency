const express = require("express")
const app = express()

const { generateToken } = require("../../service/jwt")
const { signupDB, loginDB } = require("../../db/admin")

async function signup(req, res) {
    try {
        const { username, password } = req.body

        const result = await signupDB(username, password)
        if (result === false) {
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
        const id = result[0].id

        if (result.length == 0 || result == false) {
            return res.json({ success: false, message: "username OR password wrong" })
        }

        return res.json({ success: true, token: generateToken(id) })
    } catch (error) {
        console.log(error);
        res.json({ error })
    }
}






module.exports = {
    signup,
    login,
}