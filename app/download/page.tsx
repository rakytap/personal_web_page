'use client'

import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../components/AuthProvider'
import { useLanguage } from '../components/LanguageProvider'

interface FileItem {
    id: string
    originalName: string
    fileName: string
    filePath: string
    size: number
    uploadedAt: string
    isPublic: boolean
}

export default function Download() {
    const { t } = useLanguage()
    const { isAuthenticated, username, login, logout } = useAuth()
    const [loginUsername, setLoginUsername] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [loginError, setLoginError] = useState('')
    const [files, setFiles] = useState<FileItem[]>([])
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isPublic, setIsPublic] = useState(true)

    // Fetch files
    const fetchFiles = async () => {
        setLoading(true)
        try {
            const token = localStorage.getItem('authToken')
            const headers: HeadersInit = {}
            if (token) {
                headers['Authorization'] = `Bearer ${token}`
            }

            const response = await fetch('/api/files', {
                headers,
            })

            if (response.ok) {
                const data = await response.json()
                setFiles(data.files || [])
            }
        } catch (error) {
            console.error('Error fetching files:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchFiles()
    }, [isAuthenticated])

    // Handle login
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoginError('')
        const success = await login(loginUsername, loginPassword)
        if (!success) {
            setLoginError(t('loginError'))
        } else {
            setLoginUsername('')
            setLoginPassword('')
            await fetchFiles()
        }
    }

    // Handle file upload
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        try {
            const token = localStorage.getItem('authToken')
            if (!token) {
                alert('Please login first')
                return
            }

            const formData = new FormData()
            formData.append('file', file)
            formData.append('isPublic', isPublic.toString())

            const response = await fetch('/api/files/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            })

            if (response.ok) {
                alert(t('fileUploaded'))
                await fetchFiles()
                if (fileInputRef.current) {
                    fileInputRef.current.value = ''
                }
            } else {
                alert(t('fileUploadError'))
            }
        } catch (error) {
            console.error('Upload error:', error)
            alert(t('fileUploadError'))
        } finally {
            setUploading(false)
        }
    }

    // Handle toggle visibility
    const handleToggleVisibility = async (fileId: string, currentIsPublic: boolean) => {
        try {
            const token = localStorage.getItem('authToken')
            if (!token) return

            const response = await fetch('/api/files', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    fileId,
                    isPublic: !currentIsPublic,
                }),
            })

            if (response.ok) {
                alert(t('fileUpdated'))
                await fetchFiles()
            } else {
                alert(t('fileUpdateError'))
            }
        } catch (error) {
            console.error('Toggle error:', error)
            alert(t('fileUpdateError'))
        }
    }

    // Handle delete
    const handleDelete = async (fileId: string) => {
        try {
            const token = localStorage.getItem('authToken')
            if (!token) return

            const confirmed = window.confirm(t('deleteFile'))
            if (!confirmed) return

            const response = await fetch(`/api/files?id=${fileId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })

            if (response.ok) {
                alert(t('fileDeleted'))
                await fetchFiles()
            } else {
                alert(t('fileDeleteError'))
            }
        } catch (error) {
            console.error('Delete error:', error)
            alert(t('fileDeleteError'))
        }
    }

    // Handle file download
    const handleDownload = async (fileId: string) => {
        try {
            const token = localStorage.getItem('authToken')
            const headers: HeadersInit = {}
            if (token) {
                headers['Authorization'] = `Bearer ${token}`
            }

            const response = await fetch(`/api/files/download?id=${fileId}`, {
                headers,
            })

            if (response.ok) {
                const blob = await response.blob()
                const file = files.find(f => f.id === fileId)
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = file?.originalName || 'download'
                document.body.appendChild(a)
                a.click()
                window.URL.revokeObjectURL(url)
                document.body.removeChild(a)
            } else {
                alert('Failed to download file')
            }
        } catch (error) {
            console.error('Download error:', error)
            alert('Failed to download file')
        }
    }

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B'
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString()
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
                    <div className="flex-1">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12 space-y-8">
                            <div className="text-center space-y-4">
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                                    {t('downloadTitle')}
                                </h1>
                                <p className="text-xl text-gray-600 dark:text-gray-300">
                                    {t('downloadDescription')}
                                </p>
                            </div>

                            {/* Logged in banner */}
                            {isAuthenticated && (
                                <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-6 border-l-4 border-green-500 dark:border-green-400">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {t('loggedInAs')} <span className="text-indigo-600 dark:text-indigo-400">{username}</span>
                                            </p>
                                        </div>
                                        <button
                                            onClick={logout}
                                            className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                                        >
                                            {t('logoutButton')}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* File Upload Section (only when logged in) */}
                            {isAuthenticated && (
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border-l-4 border-purple-500 dark:border-purple-400">
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                        {t('uploadFile')}
                                    </h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                {t('selectFile')}
                                            </label>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                onChange={handleFileUpload}
                                                disabled={uploading}
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="isPublic"
                                                checked={isPublic}
                                                onChange={(e) => setIsPublic(e.target.checked)}
                                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                            />
                                            <label htmlFor="isPublic" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {t('makePublic')}
                                            </label>
                                        </div>
                                        {uploading && (
                                            <p className="text-indigo-600 dark:text-indigo-400">Uploading...</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Files List */}
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    {t('uploadedFiles')}
                                </h2>
                                {loading ? (
                                    <p className="text-gray-600 dark:text-gray-300">Loading...</p>
                                ) : files.length === 0 ? (
                                    <p className="text-gray-600 dark:text-gray-300">{t('noFiles')}</p>
                                ) : (
                                    <div className="space-y-4">
                                        {files.map((file) => (
                                            <div
                                                key={file.id}
                                                className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
                                            >
                                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                                            {file.originalName}
                                                        </h3>
                                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                                                            <span>
                                                                {t('fileSize')}: {formatFileSize(file.size)}
                                                            </span>
                                                            <span>
                                                                {t('uploadedAt')}: {formatDate(file.uploadedAt)}
                                                            </span>
                                                            <span className={`px-2 py-1 rounded ${file.isPublic ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'}`}>
                                                                {file.isPublic ? t('public') : t('private')}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        {isAuthenticated && (
                                                            <button
                                                                onClick={() => handleToggleVisibility(file.id, file.isPublic)}
                                                                className="bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 text-sm"
                                                            >
                                                                {t('toggleVisibility')}
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => handleDownload(file.id)}
                                                            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover-bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 text-sm"
                                                        >
                                                            {t('downloadFile')}
                                                        </button>
                                                        {isAuthenticated && (
                                                            <button
                                                                onClick={() => handleDelete(file.id)}
                                                                className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 text-sm"
                                                            >
                                                                {t('deleteFile')}
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Login island */}
                    {!isAuthenticated && (
                        <div className="w-full lg:w-80">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    {t('loginTitle')}
                                </h2>
                                <form onSubmit={handleLogin} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            {t('username')}
                                        </label>
                                        <input
                                            type="text"
                                            value={loginUsername}
                                            onChange={(e) => setLoginUsername(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            {t('password')}
                                        </label>
                                        <input
                                            type="password"
                                            value={loginPassword}
                                            onChange={(e) => setLoginPassword(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    {loginError && (
                                        <p className="text-red-600 dark:text-red-400 text-sm">{loginError}</p>
                                    )}
                                    <button
                                        type="submit"
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                                    >
                                        {t('loginButton')}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}




