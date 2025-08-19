'use server'
const pool = require("@/../db")

export default async function GetUserProfile(userID) {
  const userAuth = await pool.query(`SELECT first_name, last_name FROM users WHERE user_id='${userID}'`)
  console.log("Function was called")
  return (userAuth.rows)
}
