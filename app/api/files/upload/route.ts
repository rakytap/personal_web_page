import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'

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
        const { readFile } = await import('fs/promises')
        const data = await readFile(FILES_METADATA_PATH, 'utf-8')
        return JSON.parse(data)
    } catch {
        return { files: [] }
    }
}

// Save files metadata
async function saveFilesMetadata(metadata: any) {
    const { writeFile } = await import('fs/promises')
    await writeFile(FILES_METADATA_PATH, JSON.stringify(metadata, null, 2))
}

export async function POST(request: NextRequest) {
    try {
        if (!verifyToken(request)) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const formData = await request.formData()
        const file = formData.get('file') as File
        const isPublic = formData.get('isPublic') === 'true'

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            )
        }

        // Ensure uploads directory exists
        try {
            await mkdir(UPLOADS_DIR, { recursive: true })
        } catch {
            // Directory already exists
        }

        // Generate unique filename
        const fileId = randomUUID()
        const fileExtension = path.extname(file.name)
        const fileName = `${fileId}${fileExtension}`
        const filePath = path.join(UPLOADS_DIR, fileName)

        // Save file
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        await writeFile(filePath, buffer)

        // Save metadata
        const metadata = await getFilesMetadata()
        metadata.files.push({
            id: fileId,
            originalName: file.name,
            fileName: fileName,
            filePath: `/uploads/${fileName}`,
            size: file.size,
            uploadedAt: new Date().toISOString(),
            isPublic: isPublic,
        })
        await saveFilesMetadata(metadata)

        return NextResponse.json({
            success: true,
            file: {
                id: fileId,
                originalName: file.name,
                isPublic: isPublic,
            },
        })
    } catch (error) {
        console.error('Error uploading file:', error)
        return NextResponse.json(
            { error: 'Failed to upload file' },
            { status: 500 }
        )
    }
}












