'use client'

import { useState, useEffect, DragEvent } from 'react'
import Image from 'next/image'

type TranslationResponse = {
  status: string
  image: string
}

const languages = [
  { value: 'en-us', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'it', label: 'Italian' },
  { value: 'pt', label: 'Portuguese' },
]

const MangaTranslator = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [translatedImage, setTranslatedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState('en-us')
  const [isDragging, setIsDragging] = useState(false)

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

  const handleFile = (file: File) => {
    setError(null)
    setTranslatedImage(null)

    if (!validateImage(file)) return

    setSelectedFile(file)
    setPreviewUrl(prev => {
      if (prev) URL.revokeObjectURL(prev)
      return URL.createObjectURL(file)
    })
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    handleFile(file)
  }

  const handleDragEnter = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const file = e.dataTransfer?.files[0]
    if (!file) return
    handleFile(file)
  }

  const handleTranslate = async () => {
    if (!selectedFile) return
    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const response = await fetch(`https://sergip8-ocr-manga-test.hf.space/translate/language/${selectedLanguage}`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Translation failed')
      }

      const data: TranslationResponse = await response.json()
      
      if (data.status !== 'ok' || !data.image) {
        throw new Error('Invalid response from server')
      }

      setTranslatedImage(data.image)
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
    
    link.href = `data:image/png;base64,${translatedImage}`
    link.download = `${fileName}-translated.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 mt-7">
      <div className="flex flex-col items-center gap-4">
        <label 
          className={`w-80 flex flex-col items-center px-4 py-10 bg-white text-blue-600 rounded-lg shadow-lg tracking-wide border-2 ${
            isDragging 
              ? 'border-blue-500 border-dashed bg-blue-50' 
              : 'border-blue-600 hover:bg-blue-50'
          } cursor-pointer transition-all duration-200`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M16.88 9.1A4 4 0 0 1 16 3H5a4 4 0 0 0-4 4v10a1 1 0 0 0 1.6.8L9 14l5.4 3.8A1 1 0 0 0 16 17V9.1zM11 11h2v2h-2v-2zm0-4h2v2h-2V7z"/>
          </svg>
          <span className="mt-2 text-sm text-center">
            {isDragging 
              ? 'Drop your manga page here' 
              : 'Drag and drop your manga page or click to select'}
          </span>
          <input 
            type="file" 
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/jpeg, image/webp"
          />
        </label>

        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>

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
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
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
                  src={`data:image/png;base64,${translatedImage}`}
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