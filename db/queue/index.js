const client = require("../connection")



async function getAllQueue() {
    try {
        return await client.query("SELECT * FROM queue")
    } catch (error) {
        console.log(error);
        return error
    }
}

async function getQueueByID(id) {
    try {
        return await client.query("SELECT * FROM queue WHERE id = $1", [id])
    } catch (error) {
        console.log(error);
        return error
    }
}


async function removeQueueByID(id) {
    try {
        return await client.query("DELETE FROM queue WHERE id = $1", [id])
    } catch (error) {
        console.log(error);
        return error
    }
}


module.exports = {
    getAllQueue,
    getQueueByID,
    removeQueueByID
}