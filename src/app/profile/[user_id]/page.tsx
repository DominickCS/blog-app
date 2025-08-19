'use client'
import GetUserProfile from "@/app/profile/actions"
import { useState, useEffect } from "react";
import { logout } from "@/app/actions/auth";
import { verifySession } from "@/app/lib/dal";

export default function UserProfile() {
  const [userSession, setUserSession] = useState(null)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    async function fetchSession() {
      const currentSession = await verifySession()
      setUserSession(currentSession.userId)
      const currentUser = await GetUserProfile(currentSession.userId)
      setUserData(currentUser)
    }
    fetchSession()

  }, []);

  return (
    <>
      {userData ?
        <div className="flex justify-center">
          <h1>Hello! {userData[0]?.first_name} {userData[0]?.last_name}!</h1>
        </div>
        : <h1 className="flex justify-center">Loading Profile...</h1>}
    </>
  )
}
