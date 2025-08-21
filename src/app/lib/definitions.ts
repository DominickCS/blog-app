import { z } from 'zod'

export const CreateArticleSchema = z.object({
  article_title: z
    .string()
    .min(2, { message: 'Article title must not be empty.' })
    .max(120, { message: 'Article title must not exceed 120 characters.' }),
  article_body: z
    .string()
    .min(2, { message: 'The article cannot be empty!' })
}
)

export const LoginFormSchema = z.object({
  username: z
    .string()
    .trim(),
  password: z
    .string()
    .trim(),
})

export const SignupFormSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  last_name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  username: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .max(20, { message: 'Name cannot be more than 20 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
})

export type FormState =
  | {
    errors?: {
      name?: string[]
      email?: string[]
      password?: string[]
      article_title?: string[]
      article_body?: string[]
    }
    message?: string
  }
  | undefined

export interface SessionPayload {
  userId?: string
}
