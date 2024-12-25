import { Inter, Poppins } from 'next/font/google'
import './globals.css'

// Initialize fonts
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable}`}>
      <body className="bg-[#2E3440] text-gray-100">{children}</body>
    </html>
  )
}
