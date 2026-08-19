import { Inter, Poppins, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import MadeByBadge from './components/MadeByBadge'

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
const jetbrainsMono = JetBrains_Mono({
  weight: ['500', '700'],
  subsets: ['latin'],
  variable: '--font-jetbrains-mono'
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#2E3440] text-gray-100">
        {children}
        <MadeByBadge />
      </body>
    </html>
  )
}
