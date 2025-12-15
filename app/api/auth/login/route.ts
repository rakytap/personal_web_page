import { createHash } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

// Helper: SHA-256 hash as hex
function hashValue(value: string): string {
    return createHash('sha256').update(value).digest('hex')
}

// Accept hashed values when provided; fall back to plaintext env/defaults
const CONFIG = {
    usernameHash: process.env.ADMIN_USERNAME_HASH,
    passwordHash: process.env.ADMIN_PASSWORD_HASH,
    usernamePlain: process.env.ADMIN_USERNAME || 'admin',
    passwordPlain: process.env.ADMIN_PASSWORD || 'lIjGuEPO9wZXPiqW',
}

function isValid(username: string, password: string) {
    if (CONFIG.usernameHash && CONFIG.passwordHash) {
        return (
            hashValue(username) === CONFIG.usernameHash &&
            hashValue(password) === CONFIG.passwordHash
        )
    }

    // Fallback to plaintext comparison if hashes not set
    return (
        username === CONFIG.usernamePlain &&
        password === CONFIG.passwordPlain
    )
}

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json()

        if (isValid(username, password)) {
            // Simple token (in production, use JWT)
            const token = Buffer.from(`${username}:${Date.now()}`).toString('base64')
            return NextResponse.json({ token, username }, { status: 200 })
        }

        return NextResponse.json(
            { error: 'Invalid credentials' },
            { status: 401 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        )
    }
}