'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useLanguage } from './LanguageProvider'

export function ProfileCard() {
    const { t } = useLanguage()
    const [currentSection, setCurrentSection] = useState(0)

    // Hardcoded photo path - place your photo in the public folder as profile-photo.jpg
    // You can also use .png, .webp, etc. Just update the path below
    const photoPath = '/profile-photo.jpg'

    // Sections configuration
    const sections = [
        {
            title: t('seniorResearchFellowTitle'),
            content: t('seniorResearchFellowContent'),
        },
        {
            title: t('seniorSoftwareEngineerTitle'),
            content: t('seniorSoftwareEngineerContent'),
        },
        {
            title: t('forensicPhysicsExpertTitle'),
            content: t('forensicPhysicsExpertContent'),
        },
        {
            title: t('algorithmDeveloperTitle'),
            content: t('algorithmDeveloper'),
        },
        {
            title: t('teamPlayerTitle'),
            content: t('teamPlayer'),
        },
        {
            title: t('groqChipProgrammingTitle'),
            content: t('groqChipProgramming'),
        },
        {
            title: t('fpgaDataFlowProgrammingTitle'),
            content: t('fpgaDataFlowProgramming'),
        },
        {
            title: t('arduinoProgrammingTitle'),
            content: t('arduinoProgramming'),
        },
        {
            title: t('threeDPrintingDesignTitle'),
            content: t('threeDPrintingDesign'),
        },
    ]

    // Auto-rotate sections every 7 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSection((prev) => (prev + 1) % 3)
        }, 7000) // Change section every 7 seconds

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="md:flex">
                    {/* Photo Section */}
                    <div className="md:w-1/3 bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 p-8 flex flex-col items-center justify-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-white dark:text-white mb-6 text-center">
                            {t('fullName')}
                        </h2>
                        <div className="relative w-48 h-48 md:w-56 md:h-56">
                            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-300 shadow-xl">
                                <Image
                                    src={photoPath}
                                    alt="Profile"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                    {/* Summary Section */}
                    <div className="md:w-2/3 p-8 md:p-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            {t('homeTitle')}
                        </h1>
                        <p className="text-xl text-indigo-600 dark:text-indigo-400 mb-8 font-semibold">
                            {t('homeSubtitle')}
                        </p>

                        <div className="relative min-h-[300px] mb-6 overflow-hidden">
                            {sections.map((section, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${currentSection === index
                                        ? 'opacity-100 translate-x-0 z-10'
                                        : currentSection < index
                                            ? 'opacity-0 translate-x-full z-0 pointer-events-none'
                                            : 'opacity-0 -translate-x-full z-0 pointer-events-none'
                                        }`}
                                >
                                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border-l-4 border-indigo-500 dark:border-indigo-400">
                                        <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">
                                            {section.title}
                                        </h3>
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                                            {section.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Section indicators */}
                        <div className="flex justify-center gap-2">
                            {sections.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSection(index)}
                                    className={`h-2 rounded-full transition-all duration-300 ${currentSection === index
                                        ? 'w-8 bg-indigo-500 dark:bg-indigo-400'
                                        : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                                        }`}
                                    aria-label={`Go to section ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

