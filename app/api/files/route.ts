import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const FILES_METADATA_PATH = path.join(process.cwd(), 'files-metadata.json')
const UPLOADS_DIR = path.join(process.cwd(), 'uploads')

// Ensure uploads directory exists
async function ensureUploadsDir() {
    try {
        await fs.access(UPLOADS_DIR)
    } catch {
        await fs.mkdir(UPLOADS_DIR, { recursive: true })
    }
}

// Delete a file safely
async function deleteFileFromDisk(fileName: string) {
    const fullPath = path.join(UPLOADS_DIR, fileName)
    try {
        await fs.unlink(fullPath)
    } catch (error: any) {
        if (error.code !== 'ENOENT') {
            throw error
        }
        // If already missing, we treat as deleted
    }
}

// Get files metadata
async function getFilesMetadata() {
    try {
        const data = await fs.readFile(FILES_METADATA_PATH, 'utf-8')
        return JSON.parse(data)
    } catch {
        return { files: [] }
    }
}

// Save files metadata
async function saveFilesMetadata(metadata: any) {
    await fs.writeFile(FILES_METADATA_PATH, JSON.stringify(metadata, null, 2))
}

// Verify authentication token
function verifyToken(request: NextRequest): boolean {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return false
    }
    const token = authHeader.substring(7)
    // Simple token verification - in production, use proper JWT verification
    try {
        const decoded = Buffer.from(token, 'base64').toString('utf-8')
        return decoded.includes(':')
    } catch {
        return false
    }
}

// GET - List files
export async function GET(request: NextRequest) {
    try {
        const isAuthenticated = verifyToken(request)
        const metadata = await getFilesMetadata()
        
        // Filter files based on authentication status
        const visibleFiles = metadata.files.filter((file: any) => {
            return isAuthenticated || file.isPublic
        })

        return NextResponse.json({ files: visibleFiles, isAuthenticated })
    } catch (error) {
        console.error('Error listing files:', error)
        return NextResponse.json(
            { error: 'Failed to list files' },
            { status: 500 }
        )
    }
}

// POST - Update file metadata (toggle public/private)
export async function POST(request: NextRequest) {
    try {
        if (!verifyToken(request)) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const { fileId, isPublic } = await request.json()
        const metadata = await getFilesMetadata()
        
        const fileIndex = metadata.files.findIndex((f: any) => f.id === fileId)
        if (fileIndex === -1) {
            return NextResponse.json(
                { error: 'File not found' },
                { status: 404 }
            )
        }

        metadata.files[fileIndex].isPublic = isPublic
        await saveFilesMetadata(metadata)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error updating file:', error)
        return NextResponse.json(
            { error: 'Failed to update file' },
            { status: 500 }
        )
    }
}

// DELETE - Remove file and metadata
export async function DELETE(request: NextRequest) {
    try {
        if (!verifyToken(request)) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const { searchParams } = new URL(request.url)
        const fileId = searchParams.get('id')
        if (!fileId) {
            return NextResponse.json(
                { error: 'File ID required' },
                { status: 400 }
            )
        }

        const metadata = await getFilesMetadata()
        const fileIndex = metadata.files.findIndex((f: any) => f.id === fileId)
        if (fileIndex === -1) {
            return NextResponse.json(
                { error: 'File not found' },
                { status: 404 }
            )
        }

        const fileToDelete = metadata.files[fileIndex]
        metadata.files.splice(fileIndex, 1)
        await deleteFileFromDisk(fileToDelete.fileName)
        await saveFilesMetadata(metadata)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting file:', error)
        return NextResponse.json(
            { error: 'Failed to delete file' },
            { status: 500 }
        )
    }
}




