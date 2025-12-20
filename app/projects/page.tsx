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
            isGitHub: true,
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
            isGitHub: true,
        },
        {
            name: 'EQuUs: Eötvös Quantum Transport Utilities',
            description: t('equusDescription'),
            url: 'https://eqt.elte.hu/',
            features: [
                t('equusFeature1'),
                t('equusFeature2'),
                t('equusFeature3'),
                t('equusFeature4'),
            ],
            language: 'Matlab',
            stars: 'Research Tool',
            isGitHub: false,
        },
        {
            name: t('publicationTitle'),
            description: t('journalArticleDescription'),
            url: 'https://www.sciencedirect.com/science/article/abs/pii/S0021999124000056',
            features: [
                t('journalArticleFeature1'),
                t('journalArticleFeature2'),
                t('journalArticleFeature3'),
                t('journalArticleFeature4'),
            ],
            language: 'Research',
            stars: 'Published',
            isGitHub: false,
        },
        {
            name: t('publicationTitle2'),
            description: t('journalArticleDescription2'),
            url: 'https://iopscience.iop.org/article/10.1088/1367-2630/ad313b',
            features: [
                t('journalArticle2Feature1'),
                t('journalArticle2Feature2'),
                t('journalArticle2Feature3'),
                t('journalArticle2Feature4'),
            ],
            language: 'Research',
            stars: 'Published',
            isGitHub: false,
        },
        {
            name: t('publicationTitle3'),
            description: t('journalArticleDescription3'),
            url: 'https://quantum-journal.org/papers/q-2025-08-29-1841/',
            features: [
                t('journalArticle3Feature1'),
                t('journalArticle3Feature2'),
                t('journalArticle3Feature3'),
                t('journalArticle3Feature4'),
            ],
            language: 'Research',
            stars: 'Published',
            isGitHub: false,
        },
    ]

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-4 drop-shadow-lg">
                        {t('projectsTitle')}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        {t('projectsDescription')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => {
                        // Different vibrant color schemes for each project
                        const colorSchemes = [
                            { bg: 'bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30', border: 'border-indigo-400', text: 'text-indigo-800 dark:text-indigo-200' },
                            { bg: 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30', border: 'border-purple-400', text: 'text-purple-800 dark:text-purple-200' },
                            { bg: 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30', border: 'border-emerald-400', text: 'text-emerald-800 dark:text-emerald-200' },
                            { bg: 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30', border: 'border-amber-400', text: 'text-amber-800 dark:text-amber-200' },
                            { bg: 'bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-900/30 dark:to-red-900/30', border: 'border-rose-400', text: 'text-rose-800 dark:text-rose-200' },
                            { bg: 'bg-gradient-to-br from-cyan-50 to-sky-50 dark:from-cyan-900/30 dark:to-sky-900/30', border: 'border-cyan-400', text: 'text-cyan-800 dark:text-cyan-200' },
                        ]
                        const colors = colorSchemes[index % colorSchemes.length]

                        return (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {project.name}
                                    </h2>
                                    <span className="text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-600 dark:to-purple-600 px-3 py-1 rounded-full shadow-md">
                                        {project.language}
                                    </span>
                                </div>

                                <p className={`mb-6 leading-relaxed ${colors.bg} p-4 rounded-lg border-l-4 ${colors.border} ${colors.text} font-medium`}>
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
                                        {project.isGitHub ? t('viewOnGitHub') : project.stars === 'Published' ? t('viewArticle') : t('viewWebsite')}
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
                        )
                    })}
                </div>
            </div>
        </main>
    )
}












