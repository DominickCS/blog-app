'use client'
import { usePathname } from "next/navigation"
import GetUserProfile from "@/app/profile/actions"
import { useEffect } from "react";

export default function UserProfile() {
  let userAuth
  const pathname = usePathname()
  const userID = pathname.split('/')[2];
  useEffect(() => {
    async function getuser() {
      userAuth = await GetUserProfile(userID)
      console.log("Test", userAuth)
      return userAuth
    }
    getuser()
  }, []);

  let firstName = userAuth[0].first_name
  let last_name = userAuth[0].last_name
  return (
    <>
      <h1>Hello! {firstName} {last_name}!</h1>
    </>
  )
}
