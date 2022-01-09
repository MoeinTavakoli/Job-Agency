const client = require('../connection')

async function signupDB(name, skill, education, username, password) {
  try {
    const result = await client.query(
      'INSERT INTO users(name, skill, education, username, password)VALUES ( $1 , $2 , $3 , $4 , $5  );',
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
      'SELECT * FROM users WHERE username = $1 AND password = $2', [username, password])
    return result.rows
  }
  catch (error) {
    return false
  }
}


async function createJobQueue(user_id, title, description) {
  try {
    const result = await client.query("INSERT INTO public.queue(user_id, title, description) VALUES( $1 , $2 , $3 );", [user_id, title, description])
    return result
  } catch (error) {
    console.log(error);
    return false
  }
}






module.exports = {
  signupDB,
  loginDB,
  createJobQueue,
}