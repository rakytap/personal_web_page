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
        teachingTitle: 'Teaching',
        teachingDescription: 'Courses and educational materials',
        courseTitle: 'Classical and Quantum Optimization',
        courseDescription: 'A comprehensive course covering classical and quantum optimization techniques',
        learningObjectives: 'Learning Objectives',
        sectionA: 'A. Qubit based quantum computer architectures',
        sectionB: 'B. Optical quantum computing',
        sectionC: 'C. Adiabatic quantum computation',
        courseFormat: 'Course Format',
        courseFormatDescription: 'During the course, the teacher will deliver oral presentations. At the end of the semester, students will take oral examinations, which will serve as the basis for their final grade.',
        topicA1: 'The concept of qubits: the Bloch sphere, visualization of the spin direction',
        topicA2: 'Single qubit gate operations: rotations on the Bloch sphere',
        topicA3: 'Relationship of classical and quantum computing: reversible logical circuits',
        topicA4: 'Entanglement between qubits, multi-qubit gates',
        topicA5: 'Quantum teleportation, Bell states',
        topicA6: 'Quantum algorithms: QFT, prime factorization, quantum phase estimation, Grover search, variational quantum algorithms',
        topicA7: 'Compilation and optimization of quantum algorithms: Deterministic algorithms, Optimization based algorithms, Partitioning of quantum circuits',
        topicB1: 'Quantum computation in Fock space representation: realization of qubits, single and two-qubit gates, deterministic and probabilistic gates',
        topicB2: 'Quantum computation with Gaussian states: Wigner function, squeezed states, Gaussian and non-Gaussian gates',
        topicB3: 'Boson sampling with Fock and Gaussian states: using boson sampling to solve optimization problems, binary optimization with boson sampling, other use case proposals for photonic quantum computing',
        topicC1: 'The adiabatic theorem',
        topicC2: 'QUBO (quadratic unconstrained binary optimization) problems',
        topicC3: 'Prime factoring as a QUBO problem',
        projectsTitle: 'Projects',
        projectsDescription: 'Open source quantum computing projects and contributions',
        keyFeatures: 'Key Features',
        viewOnGitHub: 'View on GitHub',
        squanderDescription: 'A high-performance quantum gate decomposer and compiler for optimizing quantum circuits. SQUANDER provides efficient algorithms for decomposing arbitrary quantum gates into native gate sets and optimizing quantum circuit implementations.',
        squanderFeature1: 'Efficient quantum gate decomposition into native gate sets',
        squanderFeature2: 'Quantum circuit optimization and compilation algorithms',
        squanderFeature3: 'Support for various quantum computing architectures',
        squanderFeature4: 'High-performance C++ backend with Python interface',
        piquassoDescription: 'A photonic quantum computing simulator for continuous-variable quantum computation. Piquasso enables simulation of quantum optical systems, boson sampling, and Gaussian state quantum computing with both Fock and Gaussian state representations.',
        piquassoFeature1: 'Photonic quantum computing simulation in Fock and Gaussian spaces',
        piquassoFeature2: 'Boson sampling and continuous-variable quantum algorithms',
        piquassoFeature3: 'Support for deterministic and probabilistic quantum gates',
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
        teachingTitle: 'Oktatás',
        teachingDescription: 'Kurzusok és oktatási anyagok',
        courseTitle: 'Klasszikus és Kvantum Optimalizálás',
        courseDescription: 'Átfogó kurzus a klasszikus és kvantum optimalizálási technikákat bemutatva',
        learningObjectives: 'Tanulási célok',
        sectionA: 'A. Qubit alapú kvantumszámítógép architektúrák',
        sectionB: 'B. Optikai kvantumszámítás',
        sectionC: 'C. Adiabatikus kvantumszámítás',
        courseFormat: 'Kurzus formátum',
        courseFormatDescription: 'A kurzus során a tanár szóbeli előadásokat tart. A félév végén a hallgatók szóbeli vizsgát tesznek, amely a végső osztályzat alapját képezi.',
        topicA1: 'A qubitek fogalma: a Bloch-gömb, a spin irányának vizualizálása',
        topicA2: 'Egy qubites kapuk műveletei: forgatások a Bloch-gömbön',
        topicA3: 'A klasszikus és kvantumszámítás kapcsolata: reverzibilis logikai áramkörök',
        topicA4: 'Összefonódás qubitek között, több qubites kapuk',
        topicA5: 'Kvantumteleportáció, Bell-állapotok',
        topicA6: 'Kvantumalgoritmusok: QFT, prímfaktorizáció, kvantum fázisbecslés, Grover keresés, variációs kvantumalgoritmusok',
        topicA7: 'Kvantumalgoritmusok fordítása és optimalizálása: Determinisztikus algoritmusok, Optimalizáláson alapuló algoritmusok, Kvantumáramkörök particionálása',
        topicB1: 'Kvantumszámítás Fock-tér reprezentációban: qubitek realizálása, egy- és két-qubites kapuk, determinisztikus és valószínűségi kapuk',
        topicB2: 'Kvantumszámítás Gauss-állapotokkal: Wigner-függvény, összenyomott állapotok, Gauss és nem-Gauss kapuk',
        topicB3: 'Boson mintavételezés Fock és Gauss állapotokkal: boson mintavételezés használata optimalizálási problémák megoldására, bináris optimalizálás boson mintavételezéssel, egyéb felhasználási javaslatok a fotónikus kvantumszámításra',
        topicC1: 'Az adiabatikus tétel',
        topicC2: 'QUBO (kvadratikus korlátlan bináris optimalizálási) problémák',
        topicC3: 'Prímfaktorizáció QUBO problémaként',
        projectsTitle: 'Projektek',
        projectsDescription: 'Nyílt forráskódú kvantumszámítási projektek és hozzájárulások',
        keyFeatures: 'Főbb jellemzők',
        viewOnGitHub: 'Megtekintés GitHubon',
        squanderDescription: 'Nagy teljesítményű kvantumkapu dekompozíció és fordító a kvantumáramkörök optimalizálásához. A SQUANDER hatékony algoritmusokat biztosít tetszőleges kvantumkapuk natív kapukészletekre történő dekompozíciójához és kvantumáramkör implementációk optimalizálásához.',
        squanderFeature1: 'Hatékony kvantumkapu dekompozíció natív kapukészletekre',
        squanderFeature2: 'Kvantumáramkör optimalizálási és fordító algoritmusok',
        squanderFeature3: 'Támogatás különböző kvantumszámítógép architektúrákhoz',
        squanderFeature4: 'Nagy teljesítményű C++ háttér Python interfésszel',
        piquassoDescription: 'Fotónikus kvantumszámítási szimulátor folytonos változós kvantumszámításhoz. A Piquasso lehetővé teszi kvantumoptikai rendszerek szimulációját, boson mintavételezést és Gauss állapotú kvantumszámítást Fock és Gauss állapot reprezentációkkal.',
        piquassoFeature1: 'Fotónikus kvantumszámítási szimuláció Fock és Gauss terekben',
        piquassoFeature2: 'Boson mintavételezés és folytonos változós kvantumalgoritmusok',
        piquassoFeature3: 'Támogatás determinisztikus és valószínűségi kvantumkapukhoz',
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

