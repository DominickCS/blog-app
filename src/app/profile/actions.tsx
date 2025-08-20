'use server'
const pool = require("@/../db")

export async function GetUserProfile(userID) {
  const userDetails = await pool.query(`SELECT permission_level, first_name, last_name FROM users WHERE user_id='${userID}'`)
  return (userDetails.rows)
}

export async function GetUserArticles(userID) {
  const userArticles = await pool.query(`SELECT * FROM articles WHERE user_id='${userID}'`)
  return (userArticles.rows)
}
