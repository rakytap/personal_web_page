'use client'

import { useEffect, useState } from 'react'

interface ObfuscatedEmailProps {
    encoded: string
    className?: string
}

export function ObfuscatedEmail({ encoded, className }: ObfuscatedEmailProps) {
    const [email, setEmail] = useState<string>('')
    const [mailto, setMailto] = useState<string>('')
    const [isDecoded, setIsDecoded] = useState(false)

    useEffect(() => {
        // Decode email from base64 client-side to prevent bot parsing
        try {
            const decoded = atob(encoded) // Decode from base64
            setEmail(decoded)
            setMailto(`mailto:${decoded}`)
            setIsDecoded(true)
        } catch (error) {
            // Fallback if decoding fails
            console.error('Email decoding failed')
        }
    }, [encoded])

    // Show obfuscated placeholder until decoded
    if (!isDecoded) {
        return (
            <span className={className}>
                <span data-email="hidden">Contact email</span>
            </span>
        )
    }

    return (
        <a
            href={mailto}
            className={className}
            onClick={(e) => {
                // Ensure mailto works correctly
                window.location.href = mailto
            }}
        >
            {email}
        </a>
    )
}

