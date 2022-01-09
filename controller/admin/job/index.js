const { getQueueByID, removeQueueByID } = require("../../../db/queue")
const { createJob, updateJob } = require("../../../db/job")



async function createJobCtl(req, res) {
    const { queue_id, id: admin_id } = req.body
    const resultQueue = await getQueueByID(queue_id)
    if (resultQueue.rowCount == 0 || !resultQueue) {
        res.json({ success: false, message: "queue not found !" })
    }
    const queue = resultQueue.rows[0]


    const resultCreateJob = await createJob(queue.user_id, admin_id, queue.title, queue.description)
    if (resultCreateJob.rowCount == 0 || !resultCreateJob) {
        return res.json({ success: false, error: "job not saved" })
    }
    const resultRemoveQueue = await removeQueueByID(queue.id)
    if (resultRemoveQueue.rowCount == 0 || !resultRemoveQueue) {
        return res.json({ success: false, error: "queue not removed !" })
    }
    return res.json({ success: true, message: "job successfuly saved ..." })
}



async function editJob(req, res) {
    const { title, description } = req.body
    const { job_id } = req.params

    const resultUpdate = await updateJob(job_id, title, description)
    if (resultUpdate.rowCount == 0 || !resultUpdate) {
        return res.json({ success: false, message: "job not found  " })
    }
    return res.json({ success: true, message: "job succesfuly edit " })
}



module.exports = {
    createJobCtl,
    editJob
}