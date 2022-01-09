const { verify } = require("../service/jwt")

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.json({ success: false, error: "token not found " })
    }
    try {
        const token = req.headers.authorization
        const id = verify(token).id
        req.body.id = id
        if (!id || id == undefined) {
            return res.json({ success: false, error: "token isnt valid !" })
        }
        return next()


    } catch (error) {
        console.log(error);
        res.json({ success: false, error: "token isnt valid !" })
    }

}



module.exports = verifyToken
