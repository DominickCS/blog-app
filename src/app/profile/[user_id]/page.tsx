'use client'
import { usePathname } from "next/navigation"
import GetUserProfile from "@/app/profile/actions"
import { useState, useEffect } from "react";

export default function UserProfile() {
  const [userAuth, setUserAuth] = useState(null)
  const pathname = usePathname()
  const userID = pathname.split('/')[2];

  useEffect(() => {
    async function getuser() {
      setUserAuth(await GetUserProfile(userID))
      return userAuth
    }
    getuser()
  }, [userID]);

  return (
    <>
      {userAuth ?
        <h1>Hello! {userAuth[0].first_name} {userAuth[0].last_name}!</h1>
        : <h1>Loading Profile...</h1>}
    </>
  )
}
