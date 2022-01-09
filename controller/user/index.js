const express = require("express")
const app = express()

const { decodeToken, generateToken } = require("../../service/jwt")
const { signupDB, loginDB, createJobQueue } = require("../../db/user")
const { updateResumeUser, getResumeByID, insertResume } = require("../../db/user/resume")



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
        const id = result[0].id

        if (result.length == 0 || result == false) {
            return res.json({ success: false, message: "username OR password wrong" })
        }

        return res.json({ success: true, token: generateToken(id), message: "user successfuly added ..." })
    } catch (error) {
        console.log(error);
        res.json({ error })
    }
}


async function createJob(req, res) {
    try {
        const { title, description, id } = req.body
        const result = await createJobQueue(id, title, description)
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
}



async function upsertResume(req, res) {
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

}




module.exports = {
    signup,
    login,
    createJob,
    upsertResume
}