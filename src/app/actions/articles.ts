'use server'

import { CreateArticleSchema, FormState } from "@/app/lib/definitions"
import { verifySession } from "@/app/lib/dal"
import { redirect } from "next/navigation"
const pool = require("@/../db")

export async function createArticle(state: FormState, formData: FormData) {
  const currentSession = await verifySession()
  // Validate form fields
  const validatedFields = CreateArticleSchema.safeParse({
    article_title: formData.get('article_title'),
    article_body: formData.get('article_body'),
  })

  // Prevent submission on validation error
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Set User data and hash password for database storing
  const { article_title, article_body } = validatedFields.data
  try {
    await pool.query(`
  INSERT INTO articles (article_title, article_body, user_id)
  VALUES ('${article_title}', '${article_body}', '${currentSession.userId}')
      `);
  } catch (error) {
    return {
      message: 'An error occured during article creation.',
    };
  }
  redirect(`/profile/${currentSession.userId}`)
}

export async function fetchArticles() {
  const fetchedArticles = await pool.query(`SELECT * FROM articles`);
  return fetchedArticles.rows
}

//TODO Add remaining article schema
