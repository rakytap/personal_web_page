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

                    <div className="grid md:grid-cols-2 gap-6 mt-12">

                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                {t('experience')}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                {t('experienceContent')}
                            </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                {t('skills')}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                {t('skillsContent')}
                            </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                {t('interests')}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
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

