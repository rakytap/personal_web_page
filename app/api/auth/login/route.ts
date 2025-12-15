import { NextRequest, NextResponse } from 'next/server'

// Simple authentication - in production, use proper password hashing and database
// For now, using environment variables or a simple config
const VALID_CREDENTIALS = {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'admin123', // Change this in production!
}

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json()

        if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
            // Generate a simple token (in production, use JWT or similar)
            const token = Buffer.from(`${username}:${Date.now()}`).toString('base64')
            
            return NextResponse.json(
                { token, username },
                { status: 200 }
            )
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




