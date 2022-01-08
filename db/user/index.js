const client = require('../connection')

async function signup(name, skill, education, username, password) {
  try {
    const result = await client.query(
      'INSERT INTO public.user(name, skill, education, username, password)VALUES ( $1 , $2 , $3 , $4 , $5  );',
      [name, skill, education, username, password]
    )
  } catch (error) {
    return false
  }
}

async function getdb() {
  try {
    const result = await client.query(
      'SELECT * FROM "user"')
    return result.rows
  }
  catch (error) {
    return false
  }
}



module.exports = {
  signup,
  getdb
}