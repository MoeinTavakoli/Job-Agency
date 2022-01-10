function isExist(array, number) {
    if (!array) {
        return false
    }
    let flag = false
    for (const item of array) {
        if (item == number) {
            flag = true
        }
    }
    return flag
}


module.exports = isExist