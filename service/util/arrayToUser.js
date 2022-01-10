const { getInformationByResumeID } = require("../../db/user/resume")
async function replacer(array) {
    const usersInformation = []
    if (!array) {
        return false
    }
    for (const resume_id of array) {
        usersInformation.push((await getInformationByResumeID(resume_id)).rows[0])
    }
    return usersInformation
}




module.exports = replacer