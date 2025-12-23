import { Inter, Poppins } from 'next/font/google'
import './globals.css'

export const metadata = {
  title: 'Nicolas Salgado | Portfolio',
  description: 'Portfolio of Nicolas Salgado',
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg'
  }
}

// Initialize fonts
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="text-gray-100">{children}</body>
    </html>
  )
}
