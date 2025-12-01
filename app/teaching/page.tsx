'use client'

import { useLanguage } from '../components/LanguageProvider'

export default function Teaching() {
    const { t } = useLanguage()

    const sectionATopics = [
        t('topicA1'),
        t('topicA2'),
        t('topicA3'),
        t('topicA4'),
        t('topicA5'),
        t('topicA6'),
        t('topicA7'),
    ]

    const sectionBTopics = [
        t('topicB1'),
        t('topicB2'),
        t('topicB3'),
    ]

    const sectionCTopics = [
        t('topicC1'),
        t('topicC2'),
        t('topicC3'),
    ]

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12 space-y-8">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                            {t('teachingTitle')}
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            {t('teachingDescription')}
                        </p>
                    </div>

                    {/* Course Card */}
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-6 md:p-8 border-l-4 border-indigo-500 dark:border-indigo-400">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {t('courseTitle')}
                        </h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                            {t('courseDescription')}
                        </p>

                        {/* Learning Objectives */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-6">
                                {t('learningObjectives')}
                            </h3>

                            {/* Section A */}
                            <div className="mb-6">
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                    {t('sectionA')}
                                </h4>
                                <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                                    {sectionATopics.map((topic, index) => (
                                        <li key={index} className="leading-relaxed">
                                            {topic}
                                        </li>
                                    ))}
                                </ol>
                            </div>

                            {/* Section B */}
                            <div className="mb-6">
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                    {t('sectionB')}
                                </h4>
                                <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                                    {sectionBTopics.map((topic, index) => (
                                        <li key={index} className="leading-relaxed">
                                            {topic}
                                        </li>
                                    ))}
                                </ol>
                            </div>

                            {/* Section C */}
                            <div className="mb-6">
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                    {t('sectionC')}
                                </h4>
                                <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                                    {sectionCTopics.map((topic, index) => (
                                        <li key={index} className="leading-relaxed">
                                            {topic}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>

                        {/* Course Format */}
                        <div className="bg-white dark:bg-gray-700 rounded-lg p-6 mt-6">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                {t('courseFormat')}
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {t('courseFormatDescription')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

