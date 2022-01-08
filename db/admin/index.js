const client = require('../connection')

async function signupDB(username, password) {
  try {
    const result = await client.query(
      'INSERT INTO admin( username, password)VALUES ( $1 , $2  );',
      [username, password]
    )
    return result.rows
  } catch (error) {
    return false
  }
}

async function loginDB(username, password) {
  try {
    const result = await client.query(
      'SELECT * FROM admin WHERE username = $1 AND password = $2 LIMIT 1', [username, password])
    return result.rows
  }
  catch (error) {
    return false
  }
}






module.exports = {
  signupDB,
  loginDB,
}