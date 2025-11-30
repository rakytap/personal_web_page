'use client'

import { useLanguage } from './LanguageProvider'

interface WorkEntry {
    period: string
    title: string
    organization: string
    location: string
    responsibilities: string[]
}

interface WorkHistoryTimelineProps {
    isExpanded: boolean
    onToggle: () => void
    showButton?: boolean
}

export function WorkHistoryTimeline({ isExpanded, onToggle, showButton = true }: WorkHistoryTimelineProps) {
    const { language, t } = useLanguage()

    const workEntries: WorkEntry[] = language === 'en'
        ? [
            {
                period: 'Feb 2022 - Current',
                title: 'Assistant Professor',
                organization: 'Department of Physics of Complex Systems, Eötvös Loránd University',
                location: 'Budapest, Hungary',
                responsibilities: [
                    'Simulation of transport processes in condensate matters',
                    'Developing algorithm for quantum compilation and quantum machine learning application',
                    'Development of quantum computer emulation algorithms in C++ and data flow environment',
                    'Teaching: Theory of Quantum Computing',
                    'Teaching: Programming in C, C++ and Python languages',
                ],
            },
            {
                period: 'Apr 2023 – May 2025',
                title: 'Senior Software Engineer, Consultant',
                organization: 'Maxeler Technologies, Groq',
                location: 'Mountain View, CA',
                responsibilities: [
                    'Developing quantum computing application for Groq\'s data-flow architecture',
                    'Developing exact and non-exact hardware emulation framework, architecture verification',
                    'Designing new architecture functionalities',
                ],
            },
            {
                period: 'Jan 2022 - Current',
                title: 'Researcher',
                organization: 'Quantum Computing and Information Research Group, Wigner Research Centre for Physics',
                location: 'Budapest, Hungary',
                responsibilities: [
                    'Involved in the OpenSuperQPlus project',
                    'Developed quantum compiler',
                ],
            },
            {
                period: 'Sep 2020 - Feb 2022',
                title: 'Researcher',
                organization: 'Department of Physics of Complex Systems, Eötvös Loránd University, Quantum Information National Laboratory',
                location: 'Budapest, Hungary',
                responsibilities: [
                    'Improved and developed numerical algorithms and implemented them for high performance computing',
                    'Coordinated the workflow of the Laboratory of Quantum Computer Emulators',
                    'Collaborated with team members to initiate best practices to achieve organizational goals',
                    'Wrote research papers, reports, reviews and summaries',
                ],
            },
        ]
        : [
            {
                period: '2022. február - Jelenleg',
                title: 'Egyetemi Adjunkus',
                organization: 'Összetett Rendszerek Fizikája Tanszék, Eötvös Loránd Egyetem',
                location: 'Budapest, Magyarország',
                responsibilities: [
                    'Kondenzált anyagokban zajló transzportfolyamatok szimulációja',
                    'Kvantumfordító és kvantum gépi tanulási alkalmazások algoritmusainak fejlesztése',
                    'Kvantumszámítógép emulációs algoritmusok fejlesztése C++ és adatfolyam környezetben',
                    'Oktatás: Kvantumszámítás elmélete',
                    'Oktatás: Programozás C, C++ és Python nyelven',
                ],
            },
            {
                period: '2023. április – 2025. május',
                title: 'Senior Szoftvermérnök, Tanácsadó',
                organization: 'Maxeler Technologies, Groq',
                location: 'Mountain View, CA',
                responsibilities: [
                    'Kvantumszámítási alkalmazások fejlesztése Groq adatfolyam architektúrájához',
                    'Pontos és nem pontos hardver emulációs keretrendszerek fejlesztése, architektúra verifikáció',
                    'Új architektúra funkcionalitások tervezése',
                ],
            },
            {
                period: '2022. január - Jelenleg',
                title: 'Kutató',
                organization: 'Kvantumszámítás és Információ Kutatócsoport, Wigner Fizikai Kutatóközpont',
                location: 'Budapest, Magyarország',
                responsibilities: [
                    'Részt vett az OpenSuperQPlus projektben',
                    'Kvantumfordító fejlesztése',
                ],
            },
            {
                period: '2020. szeptember - 2022. február',
                title: 'Kutató',
                organization: 'Összetett Rendszerek Fizikája Tanszék, Eötvös Loránd Egyetem, Kvantuminformációs Nemzeti Laboratórium',
                location: 'Budapest, Magyarország',
                responsibilities: [
                    'Numerikus algoritmusok fejlesztése és megvalósítása nagy teljesítményű számítástechnikai környezetben',
                    'A Kvantumszámítógép Emulátorok Laboratóriumának munkafolyamatának koordinálása',
                    'Együttműködés a csapat tagjaival a legjobb gyakorlatok bevezetésében a szervezeti célok elérése érdekében',
                    'Kutatási cikkek, jelentések, értékelések és összefoglalók írása',
                ],
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
                        {isExpanded ? t('hideWorkHistory') : t('showWorkHistory')}
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
                        {workEntries.map((entry, index) => (
                            <div key={index} className="relative flex items-start">
                                {/* Timeline dot */}
                                <div className="relative z-10 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-indigo-500 dark:bg-indigo-400 shadow-lg flex-shrink-0">
                                    <div className="w-3 h-3 rounded-full bg-white dark:bg-gray-900"></div>
                                </div>

                                {/* Content card */}
                                <div className="ml-4 md:ml-8 flex-1">
                                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow border-l-4 border-indigo-500 dark:border-indigo-400">
                                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-3">
                                            <span className="text-lg md:text-xl font-bold text-indigo-600 dark:text-indigo-400">
                                                {entry.period}
                                            </span>
                                            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                                                {entry.title}
                                            </h3>
                                        </div>
                                        <p className="text-base md:text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                                            {entry.organization}
                                        </p>
                                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4">
                                            {entry.location}
                                        </p>
                                        <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
                                            {entry.responsibilities.map((responsibility, idx) => (
                                                <li key={idx} className="leading-relaxed">
                                                    {responsibility}
                                                </li>
                                            ))}
                                        </ul>
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

