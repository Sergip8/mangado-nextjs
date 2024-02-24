"use client"
import { Chapter } from '@/app/models/manga'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function ChapterListSelect({chapters, mangaName, mangaId, screenParam, chapterParam}: {chapters: string, mangaName:string, mangaId:string, screenParam: string, chapterParam:string}) {
  const chaptersList: Chapter[] = JSON.parse(chapters)
  const router = useRouter();

  console.log(chapterParam)
  return (
    <div>
        <select
        defaultValue={chapterParam}
         onChange={(e) => {
           {
            router.push(`
            /visor/${mangaId}/${mangaName.replaceAll(" ", "-")}/${e.target.value
            }?screen=${screenParam}
            `);
          }
        }}
         className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
        <option hidden>capitulos</option>
            {chaptersList.map(chapter => (
                <option key={chapter.id} value={ chapter.numero}>Chapter {chapter.numero} {chapter.name}</option>
            ))}
            
        </select>
    </div>
  )
}

export default ChapterListSelect