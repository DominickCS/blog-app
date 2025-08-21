'use client'
import { useActionState } from 'react'
import { createArticle } from '@/app/actions/articles'

export default function CreateArticlePage() {
  const [state, action, pending] = useActionState(createArticle, undefined)

  return (
    <form className='flex flex-col mt-8 items-center md:justify-between ' action={action}>
      <div className=''>
        <label htmlFor="article_title">Article Title</label>
        <input id="article_title" name="article_title" placeholder="Article Title" />
      </div>
      {state?.errors?.article_title && <p>{state.errors.article_title}</p>}
      <div className=''>
        <textarea rows={8} cols={64} id="article_body" name="article_body" placeholder="What's on your mind?" />
      </div>
      {state?.errors?.article_body && <p>{state.errors.article_body}</p>}
      {pending ? "Publishing Article..." : state?.message}
      <button disabled={pending} type="submit">Publish</button>
    </form>
  )
}

// TODO Add Other Article DB SCHEMA
