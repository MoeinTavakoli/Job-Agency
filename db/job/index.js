const client = require("../connection")



async function createJob(user_id, admin_id, title, description) {
    try {
        return await client.query("INSERT INTO job(user_id, admin_id, title, description , date) VALUES ($1, $2, $3, $4 , CURRENT_DATE)", [user_id, admin_id, title, description])
    } catch (error) {
        console.log(error);
        return false
    }
}


async function updateJob(job_id, title, description) {
    try {
        return await client.query("UPDATE job SET  title=$1, description=$2, date=CURRENT_DATE WHERE id = $3;", [title, description, job_id])
    } catch (error) {
        console.log(error);
        return false
    }
}

async function removeJob(job_id) {
    try {
        return await client.query("DELETE FROM job WHERE id = $1; ", [job_id])
    } catch (error) {
        console.log(error);
        return false
    }
}


module.exports = {
    createJob,
    updateJob,
    removeJob

}