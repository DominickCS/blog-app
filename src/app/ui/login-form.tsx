'use client'

import { login } from '@/app/actions/auth'
import Link from 'next/link'
import { useActionState, useEffect } from 'react'
import { verifySession } from '../lib/dal'

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined)

  useEffect(() => {
    verifySession()
  }, []);

  return (
    <>
      <form className='flex flex-col items-center md:justify-center align-middle p-8' action={action}>
        <div>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" placeholder="Enter your username" />
        </div>
        {state?.errors?.username && <p>{state.errors.username}</p>}
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" placeholder='Enter your password' />
        </div>
        {state?.errors?.password && (
          <div>
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
        <button disabled={pending} type="submit">Login</button>
      </form>
      <div className='flex justify-center py-8'>
        {pending ? "Loading" : state?.message}
      </div>
      <div className='flex justify-center'>
        <Link href="/signup">New here? Sign Up!</Link>
      </div>
    </>
  )
}
