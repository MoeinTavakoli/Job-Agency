const { decodeToken } = require("../service/jwt")

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.json({ success: false, error: "token not found " })
    }
    try {
        const token = req.headers.authorization
        const id = decodeToken(token).id
        req.body.user_id = id
        return next()

    } catch (error) {
        console.log(error);
        res.json({ success: false, error: "token isnt valid !", error })
    }

}



module.exports = verifyToken
