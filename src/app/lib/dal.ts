'use server'
import 'server-only'

import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
import { redirect } from 'next/navigation'
import { cache } from 'react'


export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (!session?.userId) {
    redirect('/login')
  }
  else {
    redirect(`/profile/${session.userId}`)
  }

  return { isAuth: true, userId: session.userId }
})
