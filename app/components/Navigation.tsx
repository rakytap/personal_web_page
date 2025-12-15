'use client'

import Link from 'next/link'
import { useLanguage } from './LanguageProvider'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeToggle } from './ThemeToggle'

export function Navigation() {
    const { t } = useLanguage()

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex space-x-4">
                        <Link
                            href="/"
                            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                            {t('home')}
                        </Link>
                        <Link
                            href="/about"
                            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                            {t('about')}
                        </Link>
                        <Link
                            href="/projects"
                            className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                            {t('projects')}
                        </Link>
                        <Link
                            href="/teaching"
                            className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                            {t('teaching')}
                        </Link>
                        <Link
                            href="/contact"
                            className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                            {t('contact')}
                        </Link>
                        <Link
                            href="/download"
                            className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                            {t('download')}
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <LanguageSwitcher />
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    )
}

