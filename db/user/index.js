const client = require('../connection')

async function signupDB(name, skill, education, username, password) {
  try {
    const result = await client.query(
      'INSERT INTO public.user(name, skill, education, username, password)VALUES ( $1 , $2 , $3 , $4 , $5  );',
      [name, skill, education, username, password]
    )
    return result.rows
  } catch (error) {
    return false
  }
}

async function loginDB(username, password) {
  try {
    const result = await client.query(
      'SELECT * FROM "user" WHERE username = $1 AND password = $2', [username, password])
    return result.rows
  }
  catch (error) {
    return false
  }
}



module.exports = {
  signupDB,
  loginDB
}