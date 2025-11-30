'use client'

import { useLanguage } from './LanguageProvider'

interface EducationEntry {
  year: string
  title: string
  description: string
}

export function EducationTimeline() {
  const { language } = useLanguage()

  const educationEntries: EducationEntry[] = language === 'en' 
    ? [
        {
          year: '2014',
          title: 'Hunter license and certificate of firearm skills',
          description: 'Certified hunter with firearm skills certification',
        },
        {
          year: '2013',
          title: 'Ph.D. degree in physics',
          description: 'Ph.D. school of Eötvös University in statistical physics, biological physics and quantum mechanics',
        },
        {
          year: '2009',
          title: 'MSc degree in physics',
          description: 'Eötvös University, Faculty of science',
        },
      ]
    : [
        {
          year: '2014',
          title: 'Vadászengedély és lőfegyveres készségek igazolványa',
          description: 'Vadászengedély és lőfegyveres készségek igazolványa',
        },
        {
          year: '2013',
          title: 'Fizika PhD fokozat',
          description: 'Eötvös Loránd Egyetem PhD iskola, statisztikus fizika, biológiai fizika és kvantummechanika',
        },
        {
          year: '2009',
          title: 'Fizika MSc fokozat',
          description: 'Eötvös Loránd Egyetem, Természettudományi Kar',
        },
      ]

  return (
    <div className="relative pl-4 md:pl-0">
      {/* Timeline line - hidden on mobile, visible on desktop */}
      <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-indigo-400 to-indigo-500 dark:from-indigo-400 dark:via-indigo-500 dark:to-indigo-400"></div>

      <div className="space-y-8">
        {educationEntries.map((entry, index) => (
          <div key={index} className="relative flex items-start">
            {/* Timeline dot */}
            <div className="relative z-10 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-indigo-500 dark:bg-indigo-400 shadow-lg flex-shrink-0">
              <div className="w-3 h-3 rounded-full bg-white dark:bg-gray-900"></div>
            </div>

            {/* Content card */}
            <div className="ml-4 md:ml-8 flex-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow border-l-4 border-indigo-500 dark:border-indigo-400">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-xl md:text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {entry.year}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {entry.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                  {entry.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

