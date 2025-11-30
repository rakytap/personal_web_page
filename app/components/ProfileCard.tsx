'use client'

import Image from 'next/image'
import { useLanguage } from './LanguageProvider'

export function ProfileCard() {
    const { t } = useLanguage()

    // Hardcoded photo path - place your photo in the public folder as profile-photo.jpg
    // You can also use .png, .webp, etc. Just update the path below
    const photoPath = '/profile-photo.jpg'

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

                        <div className="space-y-6">
                            {/* Senior Research Fellow Section */}
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border-l-4 border-indigo-500 dark:border-indigo-400">
                                <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">
                                    {t('seniorResearchFellowTitle')}
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {t('seniorResearchFellowContent')}
                                </p>
                            </div>

                            {/* Senior Software Engineer Section */}
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border-l-4 border-indigo-500 dark:border-indigo-400">
                                <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">
                                    {t('seniorSoftwareEngineerTitle')}
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {t('seniorSoftwareEngineerContent')}
                                </p>
                            </div>

                            {/* Forensic Physics Expert Section */}
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border-l-4 border-indigo-500 dark:border-indigo-400">
                                <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">
                                    {t('forensicPhysicsExpertTitle')}
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {t('forensicPhysicsExpertContent')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

