const { getAllQueue, removeQueueByID } = require("../../../db/queue")




async function getQueue(req, res) {
    try {
        const queue = await getAllQueue()
        if (!queue) {
            return res.json({ success: false, message: "error eccur" })
        }
        if (queue.rowCount == 0) {
            return res.json({ success: true, message: "not found", size: 0 })
        }
        res.json({ success: true, size: queue.rowCount, queue: queue.rows })

    } catch (error) {
        console.log(error);
        res.json({ success: false, error })
    }

}


async function removeQueue(req, res) {
    const { queue_id } = req.body

    const resultRemoveQueue = await removeQueueByID(queue_id)
    if (resultRemoveQueue.rowCount == 0 || !resultRemoveQueue) {
        return res.json({ success: false, message: "queue not found ! maybe removed " })
    }
    res.json({ success: true, message: "queue successfuly removed" })
}




module.exports = {
    getQueue,
    removeQueue
}