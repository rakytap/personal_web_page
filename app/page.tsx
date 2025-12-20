'use client'

import { ProfileCard } from './components/ProfileCard'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 max-w-6xl mx-auto">
        <div className="flex flex-col items-center md:items-start gap-4 md:min-w-[250px]">
          <Link
            href="https://itl88.elte.hu:8443"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 text-lg bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200 whitespace-nowrap"
          >
            Overleaf
          </Link>
          <p className="text-sm text-gray-700 dark:text-gray-300 text-center md:text-left max-w-xs">
            Access our self-hosted Overleaf instance for collaborative LaTeX editing.{' '}
            <Link
              href="https://github.com/overleaf/overleaf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 dark:text-green-400 hover:underline"
            >
              Learn more on GitHub
            </Link>
          </p>
        </div>
        <ProfileCard />
      </div>
    </main>
  )
}

