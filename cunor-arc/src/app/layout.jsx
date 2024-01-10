import 'bootstrap/dist/css/bootstrap.css'
import Navbar from '@/components/NavbarGeneral'
import FooterGeneralComponent from '@/components/FooterGeneral'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CUNOR-Repositorio Institucional',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          {children}
          <FooterGeneralComponent />
        </body>
      </html>

  )
}
