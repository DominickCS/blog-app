'use client'
import { verifySession } from "@/app/lib/dal";
import { GetUserArticles } from "@/app/profile/actions";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react"
export default function Article() {
  const [userArticles, setUserArticles] = useState(null)
  const uri = usePathname()
  let splituri = uri.split('/')
  console.log(splituri)

  useEffect(() => {
    async function fetchSession() {
      const currentSession = await verifySession()
      const articles = await GetUserArticles(currentSession.userId)
      setUserArticles(articles)

    }
    fetchSession()

  }, []);

  console.log(userArticles)
  return (
    <>
      <section>
        {userArticles ?
          <div className="flex flex-col items-center">
            <h1>{userArticles[splituri[2] - 1]?.article_title}</h1>
            <p>{userArticles[splituri[2] - 1]?.article_body}</p>
            <p>Likes: {userArticles[splituri[2] - 1]?.like_count}</p>
          </div>
          :
          <h1>Loading Article</h1>}
      </section>
    </>
  )
}
