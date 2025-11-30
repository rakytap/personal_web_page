'use client'

import Link from 'next/link'
import { useLanguage } from '../components/LanguageProvider'

export default function Projects() {
    const { t } = useLanguage()

    const projects = [
        {
            name: 'Sequential Quantum Gate Decomposer (SQUANDER)',
            description: t('squanderDescription'),
            url: 'https://github.com/rakytap/sequential-quantum-gate-decomposer',
            features: [
                t('squanderFeature1'),
                t('squanderFeature2'),
                t('squanderFeature3'),
                t('squanderFeature4'),
            ],
            language: 'C++ / Python',
            stars: '40+',
        },
        {
            name: 'Piquasso',
            description: t('piquassoDescription'),
            url: 'https://github.com/Budapest-Quantum-Computing-Group/piquasso',
            features: [
                t('piquassoFeature1'),
                t('piquassoFeature2'),
                t('piquassoFeature3'),
            ],
            language: 'Python / C++',
            stars: '50+',
        },
    ]

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        {t('projectsTitle')}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        {t('projectsDescription')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {project.name}
                                </h2>
                                <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                                    {project.language}
                                </span>
                            </div>

                            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                                {project.description}
                            </p>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                    {t('keyFeatures')}:
                                </h3>
                                <ul className="space-y-2">
                                    {project.features.map((feature, featureIndex) => (
                                        <li
                                            key={featureIndex}
                                            className="text-gray-600 dark:text-gray-300 flex items-start"
                                        >
                                            <span className="text-indigo-600 dark:text-indigo-400 mr-2 mt-1">
                                                •
                                            </span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    ⭐ {project.stars}
                                </span>
                                <Link
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center gap-2"
                                >
                                    {t('viewOnGitHub')}
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
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}

