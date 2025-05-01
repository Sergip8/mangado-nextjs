'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

type TranslationResponse = {
  translatedImage: string
  mimeType?: string
} | null

const MangaTranslator = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [translatedImage, setTranslatedImage] = useState<TranslationResponse>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const validateImage = (file: File) => {
    const validTypes = ['image/png', 'image/jpeg', 'image/webp']
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Please upload PNG, JPEG, or WEBP.')
      return false
    }

    if (file.size > maxSize) {
      setError('File size too large. Maximum 5MB allowed.')
      return false
    }

    return true
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setTranslatedImage(null)
    const file = e.target.files?.[0]

    if (!file) return

    if (!validateImage(file)) return

    setSelectedFile(file)
  
    setPreviewUrl(prev => {
      if (prev) URL.revokeObjectURL(prev)
      return URL.createObjectURL(file)
    })
  }

  const handleTranslate = async () => {
    if (!selectedFile) return

    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('image', selectedFile)

      const response = await fetch('/api/translate', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Translation failed')
      }

      const data: TranslationResponse = await response.json()
      
      if (!data?.translatedImage) {
        throw new Error('Invalid response from server')
      }

      setTranslatedImage({
        translatedImage: data.translatedImage,
        mimeType: data.mimeType || 'image/png'
      })
    } catch (err) {
      console.error('Translation error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    if (!translatedImage) return

    const link = document.createElement('a')
    const fileName = selectedFile?.name.replace(/\.[^/.]+$/, '') || 'translated-manga'
    const extension = translatedImage.mimeType?.split('/')[1] || 'png'
    
    link.href = `data:${translatedImage.mimeType};base64,${translatedImage.translatedImage}`
    link.download = `${fileName}-translated.${extension}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-gray-800">Manga Translation Tool</h1>

      <div className="flex flex-col items-center gap-4">
        <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue-600 rounded-lg shadow-lg tracking-wide border border-blue-600 cursor-pointer hover:bg-blue-50">
          <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M16.88 9.1A4 4 0 0 1 16 3H5a4 4 0 0 0-4 4v10a1 1 0 0 0 1.6.8L9 14l5.4 3.8A1 1 0 0 0 16 17V9.1zM11 11h2v2h-2v-2zm0-4h2v2h-2V7z"/>
          </svg>
          <span className="mt-2 text-sm">Select manga page</span>
          <input 
            type="file" 
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/jpeg, image/webp"
          />
        </label>

        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg max-w-md">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
        )}

        <button
          onClick={handleTranslate}
          disabled={!selectedFile || isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⏳</span>
              Translating...
            </span>
          ) : 'Translate Image'}
        </button>
      </div>

      {(previewUrl || translatedImage) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {previewUrl && (
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">Original</h2>
              <div className="relative aspect-[3/4]">
                <Image
                  src={previewUrl}
                  alt="Original manga page"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          )}

          {translatedImage && (
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-700">Translated</h2>
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
                >
                  Download
                </button>
              </div>
              <div className="relative aspect-[3/4]">
                <Image
                  src={`data:${translatedImage.mimeType};base64,${translatedImage.translatedImage}`}
                  alt="Translated manga page"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default MangaTranslator