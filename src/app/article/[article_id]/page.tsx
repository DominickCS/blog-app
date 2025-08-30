'use client'
import { fetchArticles } from "@/app/actions/articles";
import { verifySession } from "@/app/lib/dal";
import { GetUserArticles } from "@/app/profile/actions";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react"
export default function Article() {
  const [article, setArticle] = useState(null)
  const uri = usePathname()
  let splituri = uri.split('/')

  useEffect(() => {
    async function getArticle() {
      const currentArticle = await fetchArticles()
      setArticle(currentArticle)
    }
    getArticle()
  }, [])

  return (
    <>
      <section>
        {article ?
          <div className="flex flex-col items-center m-24 border-2 border-black rounded p-72">
            <h1>{article[splituri[2] - 1]?.article_title}</h1>
            <p>{article[splituri[2] - 1]?.article_body}</p>
            <p>Likes: {article[splituri[2] - 1]?.like_count}</p>
          </div>
          :
          <h1>Loading Article</h1>}
      </section>
    </>
  )
}
