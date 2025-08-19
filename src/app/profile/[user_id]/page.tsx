'use client'
import { usePathname } from "next/navigation"
import GetUserProfile from "@/app/profile/actions"
import { useState, useEffect } from "react";
import { logout } from "@/app/actions/auth";
import { verifySession } from "@/app/lib/dal";

export default function UserProfile() {
  const [userAuth, setUserAuth] = useState(null)
  const pathname = usePathname()
  const userID = pathname.split('/')[2];

  useEffect(() => {
    verifySession()
    async function getuser() {
      setUserAuth(await GetUserProfile(userID))
      return userAuth
    }
    getuser()
  }, [userID]);

  return (
    <>
      {userAuth ?
        <div className="flex justify-center">
          <h1>Hello! {userAuth[0].first_name} {userAuth[0].last_name}!</h1>
          <button onClick={logout}>Logout</button>
        </div>
        : <h1>Loading Profile...</h1>}
    </>
  )
}
