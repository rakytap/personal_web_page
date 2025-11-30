'use client'

import { useLanguage } from './LanguageProvider'

interface EducationEntry {
  year: string
  title: string
  description: string
}

interface EducationTimelineProps {
  isExpanded: boolean
  onToggle: () => void
  showButton?: boolean
}

export function EducationTimeline({ isExpanded, onToggle, showButton = true }: EducationTimelineProps) {
  const { language, t } = useLanguage()

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
      {
        year: '2004',
        title: 'High School Diploma ',
        description: 'Selye János High School - Komárno, Slovakia',
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
      {
        year: '2004',
        title: 'Gimnáziumi érettségi',
        description: 'Selye János Gimnázium, Komárom, Szlovákia',
      },
    ]

  return (
    <div>
      {/* Toggle Button */}
      {showButton && (
        <button
          onClick={onToggle}
          className="w-full mb-6 flex items-center justify-between p-4 bg-indigo-500 dark:bg-indigo-600 text-white rounded-lg hover:bg-indigo-600 dark:hover:bg-indigo-700 transition-colors shadow-md"
        >
          <span className="text-lg font-semibold">
            {isExpanded ? t('hideEducation') : t('showEducation')}
          </span>
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}

      {/* Timeline - Only show when button is hidden (timeline shown separately below) */}
      {!showButton && (
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
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-indigo-500 dark:border-indigo-400">
                    <div className="p-4 md:p-6">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-xl md:text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                          {entry.year}
                        </span>
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                          {entry.title}
                        </h3>
                      </div>
                      <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                        {entry.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

