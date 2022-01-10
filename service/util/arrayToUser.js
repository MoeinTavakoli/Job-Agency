const { getInformationByID } = require("../../db/user/resume")
async function replacer(array) {
    const usersInformation = []
    if (!array) {
        return
    }
    for (const user_id of array) {
        usersInformation.push((await getInformationByID(user_id)).rows[0])
    }
    return usersInformation
}




module.exports = replacer