'use client'

import { useState } from 'react'
import { EducationTimeline } from '../components/EducationTimeline'
import { useLanguage } from '../components/LanguageProvider'
import { WorkHistoryTimeline } from '../components/WorkHistoryTimeline'

export default function About() {
    const { t } = useLanguage()
    const [expandedSection, setExpandedSection] = useState<'education' | 'work' | null>(null)

    const handleEducationToggle = () => {
        setExpandedSection(expandedSection === 'education' ? null : 'education')
    }

    const handleWorkToggle = () => {
        setExpandedSection(expandedSection === 'work' ? null : 'work')
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12 space-y-8">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                            {t('aboutTitle')}
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            {t('aboutDescription')}
                        </p>
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {t('aboutContent')}
                        </p>
                    </div>

                    {/* CV Download Section */}
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg p-6 border-l-4 border-indigo-500 dark:border-indigo-400">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                                    {t('downloadCV')}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {t('downloadCVDescription')}
                                </p>
                            </div>
                            <a
                                href="/cv.pdf"
                                download
                                className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center gap-2 shadow-md hover:shadow-lg"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                {t('downloadCV')}
                            </a>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-12">

                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                {t('experience')}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-justify">
                                {t('experienceContent')}
                            </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                {t('skills')}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-justify">
                                {t('skillsContent')}
                            </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                {t('interests')}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-justify">
                                {t('interestsContent')}
                            </p>
                        </div>
                    </div>

                    <div className="mt-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                            {t('education')} & {t('workHistory')}
                        </h2>

                        {/* Toggle Buttons Side by Side */}
                        <div className="grid md:grid-cols-2 gap-4 mb-8">
                            <EducationTimeline
                                isExpanded={expandedSection === 'education'}
                                onToggle={handleEducationToggle}
                                showButton={true}
                            />
                            <WorkHistoryTimeline
                                isExpanded={expandedSection === 'work'}
                                onToggle={handleWorkToggle}
                                showButton={true}
                            />
                        </div>

                        {/* Timelines - Only show the expanded one below buttons */}
                        <div>
                            {expandedSection === 'education' && (
                                <EducationTimeline
                                    isExpanded={true}
                                    onToggle={handleEducationToggle}
                                    showButton={false}
                                />
                            )}
                            {expandedSection === 'work' && (
                                <WorkHistoryTimeline
                                    isExpanded={true}
                                    onToggle={handleWorkToggle}
                                    showButton={false}
                                />
                            )}
                        </div>
                    </div>


                </div>
            </div>
        </main>
    )
}

