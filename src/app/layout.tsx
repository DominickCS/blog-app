import "@/app/globals.css"
import NavigationBar from "@/app/components/ui/navbar/page"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <NavigationBar />
        {children}
      </body>
    </html>
  )
}
