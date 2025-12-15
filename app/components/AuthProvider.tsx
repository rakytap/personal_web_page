'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
    isAuthenticated: boolean
    username: string | null
    login: (username: string, password: string) => Promise<boolean>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [username, setUsername] = useState<string | null>(null)

    useEffect(() => {
        // Check if user is already logged in
        const token = localStorage.getItem('authToken')
        const storedUsername = localStorage.getItem('username')
        if (token && storedUsername) {
            setIsAuthenticated(true)
            setUsername(storedUsername)
        }
    }, [])

    const login = async (username: string, password: string): Promise<boolean> => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })

            if (response.ok) {
                const data = await response.json()
                localStorage.setItem('authToken', data.token)
                localStorage.setItem('username', username)
                setIsAuthenticated(true)
                setUsername(username)
                return true
            }
            return false
        } catch (error) {
            console.error('Login error:', error)
            return false
        }
    }

    const logout = () => {
        localStorage.removeItem('authToken')
        localStorage.removeItem('username')
        setIsAuthenticated(false)
        setUsername(null)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}






