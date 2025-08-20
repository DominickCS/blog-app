'use server'
import "@/app/globals.css"
import NavigationBar from "@/app/components/ui/navbar/page"
import { verifySession } from "@/app/lib/dal"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let userSession
  try {
    const session = await verifySession()
    userSession = session
  }
  catch (error) {
    console.log(error)
  }
  return (
    <html>
      <body>
        <NavigationBar session={userSession} />
        {children}
      </body>
    </html>
  )
}
