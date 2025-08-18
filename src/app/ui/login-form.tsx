'use client'

import { login } from '@/app/actions/auth'
import { useActionState } from 'react'

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined)
  return (
    <form className='flex justify-center align-middle' action={action}>
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
  )
}
