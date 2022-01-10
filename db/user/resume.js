const client = require("../connection")

async function getResumeByID(user_id) {
    try {
        return await client.query("SELECT id FROM resume WHERE user_id = $1", [user_id])
    } catch (error) {
        console.log(error);
        return false
    }
}

async function insertResume(user_id, message) {
    try {
        return await client.query("INSERT INTO resume( user_id, message) VALUES ( $1 , $2 )", [user_id, message])
    } catch (error) {
        console.log(error);
        return false
    }
}




async function updateResumeUser(user_id, message) {
    try {
        return await client.query("UPDATE resume SET message= $1 WHERE user_id = $2", [message, user_id])
    } catch (error) {
        console.log(error);
        return false
    }
}


async function addResumeToJob(resume_id, job_id) {
    try {
        return await client.query(`UPDATE job SET resume_id = resume_id || '{${resume_id}}' WHERE id = $1`, [job_id])
    } catch (error) {
        console.log(error);
        return false
    }
}

async function getResumeFromJob(job_id) {
    try {
        return await client.query(`SELECT resume_id FROM job WHERE id = $1`, [job_id])
    } catch (error) {
        console.log(error);
        return false
    }
}




async function getInformationByID(user_id) {
    try {
        return await client.query("SELECT users.id , users.name ,users.skill,users.education , resume.message from users  INNER JOIN resume ON resume.user_id = users.id WHERE user_id = $1", [user_id])
    } catch (error) {
        console.log(error);
        return false
    }
}




module.exports = {
    updateResumeUser,
    getResumeByID,
    insertResume,
    addResumeToJob,
    getResumeFromJob,
    getInformationByID
}