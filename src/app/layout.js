import { Inter, Poppins, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import MadeByBadge from './components/MadeByBadge'
import LanguageToggle from './components/LanguageToggle'
import MouseTrail from './components/MouseTrail'
import GravityEngine from './components/GravityEngine'
import ZeroGEngine from './components/ZeroGEngine'
import MagnetEngine from './components/MagnetEngine'
import CrtOverlay from './components/CrtOverlay'
import TerminalMode from './components/TerminalMode'
import ConfettiBurst from './components/ConfettiBurst'
import CursorDodge from './components/CursorDodge'
import { LanguageProvider } from './context/LanguageContext'
import { TricksProvider } from './context/TricksContext'

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
        <LanguageProvider>
          <TricksProvider>
            {children}
            <LanguageToggle />
            <MadeByBadge />
            <MouseTrail />
            <GravityEngine />
            <ZeroGEngine />
            <MagnetEngine />
            <CrtOverlay />
            <TerminalMode />
            <ConfettiBurst />
            <CursorDodge />
          </TricksProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
