// app/layout.js
import './globals.css'
import { AuthProvider } from './context/AuthContext'

export const metadata = {
  title: 'FlipShop',
  description: 'Find Products You Love',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#2D2D35]">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}