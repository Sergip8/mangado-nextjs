import { MangaMainInfo } from '@/app/api/mangas/route'
import { Chapter } from '@/app/models/manga'
import React from 'react'
import Image from "next/image";
import Link from 'next/link';
function ChapterList({chapters, params}:{chapters:Chapter[], params:any}) {
   
  return (
    
        <div className='w-full sm:w-6/12'>
            <div className="text-xl font-bold text-gray-900 truncate dark:text-white">Capitulos</div>
        <hr className="h-[2px] mx-auto my-1 bg-gray-100 border-0 rounded  dark:bg-gray-200"></hr>

      {chapters.length>0 && 
      
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full pt-5 h-[500px] md:overflow-y-scroll p-5">
        {chapters.map((c,i) =>(
               <Link
               key={i}
               href={`/visor/${params.id}/${params.name}/${c.numero}`}
               >
         <li className=" py-3 sm:pb-4 cursor-pointer w-full  px-2">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
               
               <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                     Capitulo {c.numero}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-white">
                     
                  </p>
               </div>
               <div >
            <Image
            className="dark:invert"
              src="/icon-right-arrow.svg"
              width={16}
              height={16}
              alt="Shopping Cart Icon"
            />
               </div>
            </div>
            <hr className="h-[1px] mx-auto my-1 bg-gray-500 border-0 rounded  dark:bg-gray-200"></hr>

         </li>
         </Link>
                    
        ))}
        
      </ul>
}
          </div>

   
  )
}

export default ChapterList