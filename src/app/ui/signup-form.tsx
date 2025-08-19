'use client'

import { signup } from '@/app/actions/auth'
import { useActionState, useEffect } from 'react'
import { verifySession } from '../lib/dal'


export function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined)
  useEffect(() => {
    verifySession()
  }, []);
  return (
    <form className='flex flex-col mt-8 items-center md:justify-between ' action={action}>
      <div className=''>
        <label htmlFor="first_name">First Name</label>
        <input id="first_name" name="first_name" placeholder="First Name" />
      </div>
      {state?.errors?.first_name && <p>{state.errors.first_name}</p>}
      <div className=''>
        <label htmlFor="last_name">Last Name</label>
        <input id="last_name" name="last_name" placeholder="Last Name" />
      </div>
      {state?.errors?.last_name && <p>{state.errors.last_name}</p>}
      <div className=''>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" placeholder="Username" />
      </div>
      {state?.errors?.username && <p>{state.errors.username}</p>}
      <div className=''>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="Enter your email" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" placeholder='Enter a password' />
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
      <button disabled={pending} type="submit">Sign Up</button>
    </form>
  )
}
