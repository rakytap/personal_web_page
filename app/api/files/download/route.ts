import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'

const FILES_METADATA_PATH = path.join(process.cwd(), 'files-metadata.json')
const UPLOADS_DIR = path.join(process.cwd(), 'uploads')

// Verify authentication token
function verifyToken(request: NextRequest): boolean {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return false
    }
    const token = authHeader.substring(7)
    try {
        const decoded = Buffer.from(token, 'base64').toString('utf-8')
        return decoded.includes(':')
    } catch {
        return false
    }
}

// Get files metadata
async function getFilesMetadata() {
    try {
        const data = await readFile(FILES_METADATA_PATH, 'utf-8')
        return JSON.parse(data)
    } catch {
        return { files: [] }
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const fileId = searchParams.get('id')

        if (!fileId) {
            return NextResponse.json(
                { error: 'File ID required' },
                { status: 400 }
            )
        }

        const metadata = await getFilesMetadata()
        const file = metadata.files.find((f: any) => f.id === fileId)

        if (!file) {
            return NextResponse.json(
                { error: 'File not found' },
                { status: 404 }
            )
        }

        // Check if file is public or user is authenticated
        const isAuthenticated = verifyToken(request)
        if (!file.isPublic && !isAuthenticated) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 403 }
            )
        }

        // Read and return file
        const filePath = path.join(UPLOADS_DIR, file.fileName)
        const fileBuffer = await readFile(filePath)

        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': `attachment; filename="${file.originalName}"`,
            },
        })
    } catch (error) {
        console.error('Error downloading file:', error)
        return NextResponse.json(
            { error: 'Failed to download file' },
            { status: 500 }
        )
    }
}




