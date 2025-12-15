import type { Metadata } from 'next'
import { AuthProvider } from './components/AuthProvider'
import { LanguageProvider } from './components/LanguageProvider'
import { Navigation } from './components/Navigation'
import { ThemeProvider } from './components/ThemeProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Personal Web Page',
  description: 'My personal website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-900 transition-colors">
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <Navigation />
              {children}
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

