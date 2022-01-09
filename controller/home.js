const { getAllJob, getJobByID } = require("../db/job")


async function home(req, res) {
    const jobs = await getAllJob()
    if (jobs.rowCount == 0 || !jobs) {
        return res.json({ success: false, message: "jobs not yet added !" })
    }
    return res.json({ success: true, size: jobs.rowCount, jobs: jobs.rows })
}


async function jobByID(req, res) {
    const { job_id } = req.params
    const jobs = await getJobByID(job_id)
    if (jobs.rowCount == 0 || !jobs) {
        return res.json({ success: false, message: "job not found !" })
    }
    return res.json({ success: true, job: jobs.rows })
}



module.exports = {
    home,
    jobByID
}