'use server'

import { SignupFormSchema, LoginFormSchema, FormState } from '@/app/lib/definitions'
const bcrypt = require('bcrypt');
const pool = require("@/../db")

export async function login(state: FormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { username, password } = validatedFields.data
  try {
    const userAuth = await pool.query(`SELECT uuid username, password FROM users WHERE username='${username}'`)
    // console.log(userAuth)
    console.log(password)
    console.log(userAuth.rows[0].password)

    let comparePasswords = await bcrypt.compare(password, userAuth.rows[0].password)
    console.log(comparePasswords)
  } catch (error) {
    return {
      message: 'DB Error - Could not verify user',
    };
  }

}


export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get('username'),
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // 2. Prepare data for insertion into database
  const { username, first_name, last_name, email, password } = validatedFields.data
  // e.g. Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10)

  // 3. Insert the user into the database or call an Auth Library's API
  try {
    await pool.query(`
  INSERT INTO users (username, first_name, last_name, email, password)
  VALUES ('${username}', '${first_name}', '${last_name}', '${email}', '${hashedPassword}')
      `);
  } catch (error) {
    return {
      message: 'DB Error - Could not register user',
    };
  }
}
