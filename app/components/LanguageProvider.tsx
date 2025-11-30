'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Language = 'en' | 'hu'

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<Language, Record<string, string>> = {
    en: {
        home: 'Home',
        about: 'About Me',
        teaching: 'Teaching',
        contact: 'Contact',
        aboutTitle: 'About Me',
        aboutDescription: 'Learn more about my background, interests, and professional journey.',
        aboutContent: 'Welcome to my personal website! I am passionate about technology, education, and continuous learning. This space is where I share my experiences, projects, and thoughts.',
        education: 'Education',
        experience: 'Experience',
        skills: 'Skills',
        interests: 'Interests',
        educationContent: '2014: Hunter license and certificate of firearm skills.\n\n2013: Ph.D. degree in physics (Ph.D. school of Eötvös University in statistical physics, biological physics and quantum mechanics).\n\n2009: MSc degree in physics (Eötvös University, Faculty of science).',
        experienceContent: 'Experience: 10 years of experience in the field of computer science',
        skillsContent: 'Skills: Programming, software development, database management, system administration, project management',
        interestsContent: 'Interests: Programming, software development, database management, system administration, project management',
        showEducation: 'Show Education',
        hideEducation: 'Hide Education',
    },
    hu: {
        home: 'Kezdőlap',
        about: 'Rólam',
        teaching: 'Oktatás',
        contact: 'Kapcsolat',
        aboutTitle: 'Rólam',
        aboutDescription: 'Tudj meg többet rólam, érdeklődési köreimről és szakmai múltamról.',
        aboutContent: 'Üdvözöllek személyes weboldalamon! Szenvedélyem a technológia, az oktatás és a folyamatos tanulás. Ez a hely az, ahol megosztom tapasztalataimat, projekteimet és gondolataimat.',
        education: 'Végzettség',
        experience: 'Tapasztalat',
        skills: 'Készségek',
        interests: 'Érdeklődési körök',
        educationContent: '2014: Vadászengedély és lőfegyveres készségek igazolványa.\n\n2013: Fizika PhD fokozat (Eötvös Loránd Egyetem PhD iskola, statisztikus fizika, biológiai fizika és kvantummechanika).\n\n2009: Fizika MSc fokozat (Eötvös Loránd Egyetem, Természettudományi Kar).',
        experienceContent: 'Tapasztalat: 10 év tapasztalat a számítástechnika területén',
        skillsContent: 'Készségek: Programozás, szoftverfejlesztés, adatbáziskezelés, rendszerezés, projektkezelés',
        interestsContent: 'Érdeklődési körök: Programozás, szoftverfejlesztés, adatbáziskezelés, rendszerezés, projektkezelés',
        showEducation: 'Végzettség megjelenítése',
        hideEducation: 'Végzettség elrejtése',
    },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const savedLanguage = localStorage.getItem('language') as Language | null
        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'hu')) {
            setLanguageState(savedLanguage)
        }
    }, [])

    const setLanguage = (lang: Language) => {
        setLanguageState(lang)
        localStorage.setItem('language', lang)
    }

    const t = (key: string): string => {
        return translations[language][key] || key
    }

    // Always provide the context, even before mounting
    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}

