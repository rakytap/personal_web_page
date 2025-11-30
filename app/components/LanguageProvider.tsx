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
        projects: 'Projects',
        teaching: 'Teaching',
        contact: 'Contact',
        aboutTitle: 'About Me',
        aboutDescription: 'Learn more about my background, interests, and professional journey.',
        aboutContent: 'Welcome to my personal website! I am passionate about technology, education, and continuous learning. This space is where I share my experiences, projects, and thoughts.',
        education: 'Education',
        experience: 'Experience',
        workHistory: 'Work History',
        skills: 'Skills',
        interests: 'Interests',
        educationContent: '2014: Hunter license and certificate of firearm skills.\n\n2013: Ph.D. degree in physics (Ph.D. school of Eötvös University in statistical physics, biological physics and quantum mechanics).\n\n2009: MSc degree in physics (Eötvös University, Faculty of science).',
        experienceContent: 'Experience: 10 years of experience in the field of computer science',
        skillsContent: 'Skills: Programming, software development, database management, system administration, project management',
        interestsContent: 'Interests: Programming, software development, database management, system administration, project management',
        showEducation: 'Show Education',
        hideEducation: 'Hide Education',
        showWorkHistory: 'Show Work History',
        hideWorkHistory: 'Hide Work History',
        homeTitle: 'Welcome to My Personal Web Page',
        homeSubtitle: 'A place to showcase my work, interests, and ongoing projects.',
        seniorResearchFellowTitle: 'Senior Research Fellow',
        seniorResearchFellowContent: 'I am an experienced and forward-thinking Senior Research Fellow with a decade of expertise in quantum computing and high-performance computing (HPC). My work includes developing algorithms for quantum machine learning, creating hardware emulation frameworks, and designing advanced architectural features that support next-generation quantum applications.',
        seniorSoftwareEngineerTitle: 'Senior Software Engineer',
        seniorSoftwareEngineerContent: 'I bring a strong foundation in physics and software engineering, combined with a proven track record of delivering innovative, high-impact solutions. I am a dependable and collaborative team member with strong communication and problem-solving abilities, known for managing multiple priorities effectively and maintaining a positive, proactive approach.',
        forensicPhysicsExpertTitle: 'Forensic Physics Expert',
        forensicPhysicsExpertContent: 'I am eager to take on new challenges and contribute meaningfully to ambitious engineering projects. My expertise in physics and computational methods allows me to provide valuable insights and solutions in forensic physics applications.',
        fullName: 'Dr. Peter Rakyta',
        contactTitle: 'Contact',
        contactDescription: 'Get in touch with me',
        workplace: 'Workplace',
        workplaceName: 'Department of Physics of Complex Systems',
        workplaceUniversity: 'Eötvös Loránd University',
        workplaceCity: 'Budapest',
        workplaceAddress: 'Pázmány Péter sétány 1/A.',
        workplacePostalCode: 'H-1117 Hungary',
        email: 'Email',
        emailEncoded: 'cGV0ZXIucmFreXRhQHR0ay5lbHRlLmh1', // base64 encoded email
        projectsTitle: 'Projects',
        projectsDescription: 'Explore my open-source contributions and research projects in quantum computing.',
        squanderDescription: 'A C++ library with Python interface to train quantum circuits, quantum gate synthesis and state preparation. This high-performance computational library provides multiple decomposition methods and optimization techniques for quantum circuits.',
        squanderFeature1: 'Decompose unitaries into quantum circuits with multiple methods',
        squanderFeature2: 'Optimize wide quantum circuits using advanced techniques',
        squanderFeature3: 'Prepare quantum states via adaptive state preparation',
        squanderFeature4: 'Run variational quantum algorithms (VQE, GQML)',
        piquassoDescription: 'A Python/C++ framework for efficient photonic quantum computer simulation. Piquasso provides a comprehensive toolkit for simulating photonic quantum computing systems with high performance.',
        piquassoFeature1: 'Efficient photonic quantum computer simulation',
        piquassoFeature2: 'High-performance C++ backend with Python interface',
        piquassoFeature3: 'Comprehensive toolkit for photonic quantum systems',
        keyFeatures: 'Key Features',
        viewOnGitHub: 'View on GitHub',
    },
    hu: {
        home: 'Kezdőlap',
        about: 'Rólam',
        projects: 'Projektek',
        teaching: 'Oktatás',
        contact: 'Kapcsolat',
        aboutTitle: 'Rólam',
        aboutDescription: 'Tudj meg többet rólam, érdeklődési köreimről és szakmai múltamról.',
        aboutContent: 'Üdvözöllek személyes weboldalamon! Szenvedélyem a technológia, az oktatás és a folyamatos tanulás. Ez a hely az, ahol megosztom tapasztalataimat, projekteimet és gondolataimat.',
        education: 'Végzettség',
        experience: 'Tapasztalat',
        workHistory: 'Munkatörténet',
        skills: 'Készségek',
        interests: 'Érdeklődési körök',
        educationContent: '2014: Vadászengedély és lőfegyveres készségek igazolványa.\n\n2013: Fizika PhD fokozat (Eötvös Loránd Egyetem PhD iskola, statisztikus fizika, biológiai fizika és kvantummechanika).\n\n2009: Fizika MSc fokozat (Eötvös Loránd Egyetem, Természettudományi Kar).',
        experienceContent: 'Tapasztalat: 10 év tapasztalat a számítástechnika területén',
        skillsContent: 'Készségek: Programozás, szoftverfejlesztés, adatbáziskezelés, rendszerezés, projektkezelés',
        interestsContent: 'Érdeklődési körök: Programozás, szoftverfejlesztés, adatbáziskezelés, rendszerezés, projektkezelés',
        showEducation: 'Végzettség megjelenítése',
        hideEducation: 'Végzettség elrejtése',
        showWorkHistory: 'Munkatörténet megjelenítése',
        hideWorkHistory: 'Munkatörténet elrejtése',
        homeTitle: 'Üdvözöllek a személyes weboldalamon',
        homeSubtitle: '?????',
        seniorResearchFellowTitle: '?????',
        seniorResearchFellowContent: 'T?????',
        seniorSoftwareEngineerTitle: 'Senior Szoftvermérnök',
        seniorSoftwareEngineerContent: '?????',
        forensicPhysicsExpertTitle: 'Kriminalisztikai Fizikai Szakértő',
        forensicPhysicsExpertContent: '?????',
        fullName: 'Dr. Rakyta Péter',
        contactTitle: 'Kapcsolat',
        contactDescription: 'Lépjen kapcsolatba velem',
        workplace: 'Munkahely',
        workplaceName: 'Összetett Rendszerek Fizikája Tanszék',
        workplaceUniversity: 'Eötvös Loránd Egyetem',
        workplaceCity: 'Budapest',
        workplaceAddress: 'Pázmány Péter sétány 1/A.',
        workplacePostalCode: 'H-1117 Magyarország',
        email: 'E-mail',
        emailEncoded: 'cGV0ZXIucmFreXRhQHR0ay5lbHRlLmh1', // base64 encoded email
        projectsTitle: 'Projektek',
        projectsDescription: 'Fedezd fel nyílt forráskódú hozzájárulásaimat és kvantumszámítástechnikai kutatási projekteimet.',
        squanderDescription: 'C++ könyvtár Python felülettel kvantum áramkörök tanításához, kvantum kapu szintézishez és állapot előkészítéshez. Ez a nagy teljesítményű számítási könyvtár több dekompozíciós módszert és optimalizálási technikát biztosít kvantum áramkörökhöz.',
        squanderFeature1: 'Unitáris mátrixok dekompozíciója kvantum áramkörökké több módszerrel',
        squanderFeature2: 'Széles kvantum áramkörök optimalizálása fejlett technikákkal',
        squanderFeature3: 'Kvantum állapotok előkészítése adaptív állapot előkészítéssel',
        squanderFeature4: 'Variációs kvantum algoritmusok futtatása (VQE, GQML)',
        piquassoDescription: 'Python/C++ keretrendszer hatékony fotonikus kvantumszámítógép szimulációhoz. A Piquasso átfogó eszközkészletet biztosít fotonikus kvantumszámítástechnikai rendszerek nagy teljesítményű szimulációjához.',
        piquassoFeature1: 'Hatékony fotonikus kvantumszámítógép szimuláció',
        piquassoFeature2: 'Nagy teljesítményű C++ háttér Python felülettel',
        piquassoFeature3: 'Átfogó eszközkészlet fotonikus kvantum rendszerekhez',
        keyFeatures: 'Főbb Jellemzők',
        viewOnGitHub: 'Megtekintés GitHubon',
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

