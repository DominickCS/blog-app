'use server'

import { SignupFormSchema, LoginFormSchema, FormState } from '@/app/lib/definitions'
import { redirect } from 'next/navigation';
import { createSession } from '@/app/lib/session';
const bcrypt = require('bcrypt');
const pool = require("@/../db")
import { cookies } from 'next/headers'
import { deleteSession } from '@/app/lib/session'


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
  let user_id
  try {
    const userAuth = await pool.query(`SELECT user_id, username, password FROM users WHERE username='${username}'`)
    let comparePasswords = await bcrypt.compare(password, userAuth.rows[0].password)
    if (comparePasswords) {
      user_id = userAuth.rows[0].user_id
    }
  } catch (error) {
    return {
      message: 'Incorrect Login Credentials',
    };
  }
  await createSession(user_id)
  redirect(`/profile/${user_id}/`)
}

export async function logout() {
  await deleteSession()
  redirect('/login')
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
