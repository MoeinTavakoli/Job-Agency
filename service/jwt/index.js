const jwt = require("jsonwebtoken");
const config = require("../../config");




function decodeToken(token) {
    return jwt.decode(token);
}

function generateToken(id) {
    return jwt.sign({ id }, config.jwt.secret);
}

module.exports = {
    decodeToken,
    generateToken,
};