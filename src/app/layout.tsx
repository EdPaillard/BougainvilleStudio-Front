import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Banner from './banner/Banner'
import UserProvider from './contexts/userContext'
import BottomNavBar from './bottomNavBar/BottomNavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bougainville',
  description: 'Crossmedia narration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <UserProvider>
          <body>
              <Banner/>
              {children}
              <BottomNavBar />
          </body>
        </UserProvider>
    </html>
  )
}
