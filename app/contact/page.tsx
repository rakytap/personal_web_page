'use client'

import { useLanguage } from '../components/LanguageProvider'
import { ObfuscatedEmail } from '../components/ObfuscatedEmail'

export default function Contact() {
    const { t } = useLanguage()

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12 space-y-8">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                            {t('contactTitle')}
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            {t('contactDescription')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Contact Information */}
                        <div className="space-y-6">
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    {t('workplace')}
                                </h2>
                                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                                    <p className="font-medium">{t('workplaceName')}</p>
                                    <p>{t('workplaceUniversity')}</p>
                                    <p>{t('workplaceCity')}</p>
                                    <p>{t('workplaceAddress')}</p>
                                    <p>{t('workplacePostalCode')}</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    {t('email')}
                                </h2>
                                <ObfuscatedEmail
                                    encoded={t('emailEncoded')}
                                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors break-all"
                                />
                            </div>
                        </div>

                        {/* Google Maps */}
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                {t('workplace')}
                            </h2>
                            <div className="w-full h-96 rounded-lg overflow-hidden shadow-md">
                                <iframe
                                    src="https://www.google.com/maps?q=47.474824,19.062086&hl=en&z=16&output=embed"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="w-full h-full"
                                    title="Workplace Location"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

