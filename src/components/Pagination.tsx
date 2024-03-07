"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'

function Pagination({page, num_pages}:{page:number, num_pages:number}) {
    const router = useRouter();
    const currentUrl = usePathname();
    const [currPage, setCurrPage] = useState(page==0?1:page+1);
    function ChangePage(p: number) {
        
        router.push(currentUrl+`?page=${p+1}`);
    }
    console.log(currPage)
    useEffect(() => {
        // 2.1: create `URL` from `window` URL
        const url = new URL(window.location.href);
        // 2.2: add query params you wish to add
        url.searchParams.set('page', currPage.toString());
        // 2.3: add the new URL to the `router` object
        router.push(url.toString());
      }, [currPage]);
  return (
    <div className='w-full flex justify-center'>
       
  <ul className="inline-flex -space-x-px text-sm ">
    <li>
      <button onClick={()=>{setCurrPage(p => p-1)}} disabled={currPage<=1} className="disabled:bg-slate-50 disabled:hover:bg-slate-50 flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
    </li>
    {Array.from({ length: num_pages }, (_, index) => index).map((p,i) => (
    <li key={i}>
        
      <button onClick={() => {setCurrPage(p+1)}} className={`${p+1 === currPage? 'text-lg':''} flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>{p+1}</button>
    </li>

    ))}
  
    <li>
      <button onClick={()=>{setCurrPage(p => p+1)}} disabled={currPage >= num_pages} className="disabled:bg-slate-50 disabled:hover:bg-slate-50 flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
    </li>
  </ul>

    </div>
  )
}

export default Pagination