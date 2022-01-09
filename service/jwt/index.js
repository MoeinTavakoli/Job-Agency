const jwt = require("jsonwebtoken");
const config = require("../../config");




function decodeToken(token) {
    return jwt.decode(token);
}

function generateToken(id) {
    return jwt.sign({ id }, config.jwt.secret);
}

function verify(token) {
    try {
        return jwt.verify(token, config.jwt.secret);
    } catch (error) {
        return false
    }
}



module.exports = {
    decodeToken,
    generateToken,
    verify
};