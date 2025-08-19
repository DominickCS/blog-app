'use client'
import "@/app/globals.css"
import NavigationBar from "@/app/components/ui/navbar/page"
import { useState, useEffect } from 'react'
import { verifySession } from "@/app/lib/dal"

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
