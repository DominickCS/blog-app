'use client'
import { GetUserArticles, GetUserProfile } from "@/app/profile/actions"
import { useState, useEffect } from "react";
import { verifySession } from "@/app/lib/dal";
import Link from "next/link";

export default function UserProfile() {
  const [userSession, setUserSession] = useState(null)
  const [userData, setUserData] = useState(null)
  const [userArticles, setUserArticles] = useState(null)

  useEffect(() => {
    async function fetchSession() {
      const currentSession = await verifySession()
      setUserSession(currentSession.userId)
      const profile = await GetUserProfile(currentSession.userId)
      const articles = await GetUserArticles(currentSession.userId)
      setUserData(profile)
      setUserArticles(articles)

    }
    fetchSession()

  }, []);

  return (
    <>
      {userData ?
        <div className="flex flex-col items-center">
          <h1>Hello! {userData[0]?.first_name} {userData[0]?.last_name}!</h1>
          <p>Current Permission Level: {userData[0]?.permission_level}</p>
          {userData[0]?.permission_level === 'Administrator' ?
            <Link href="/admin/create-article">Create New Article</Link>
            :
            null
          }
        </div>
        : <h1 className="flex justify-center">Loading Profile...</h1>}
      {userArticles ?
        <div className="flex flex-col items-center py-8">
          <h2>Your Articles</h2>
          <ul>{userArticles?.map((article) => (
            <li key={article.article_id}><Link href={`/article/${article.article_id}`}> {decodeURI(article.article_title)}</Link></li>
          ))}

          </ul>
        </div>
        :
        <p>Loading Articles...</p>
      }
    </>
  )
}
