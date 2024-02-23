"use client"
import React, { useRef, useState } from 'react'
import DropdownItem from './dropdown-item'
import Link from "next/link";
import { useRouter } from 'next/navigation';

function searchOptions(){
    return ["manga",
    "Manhua",
   " Manhwa",
    "Novela",
    "One shot",
    "Doujinshi",
    "Oel"]
  }

function SearchBar() {

    const router = useRouter();
    const [search, setSearch] = useState("")
    const options = searchOptions()
    function handleKeyDown(event: any) {
        
        if (event.key === 'Enter') {
            event.preventDefault()
            router.push(`/biblioteca?q=${search}`);
       }
     }

  return (
    <div>
        <form>
            <div className="flex">
              <DropdownItem options={options} isFilter={false}/>

              <div className="relative lg:w-[450px] ms:w-[300px]">
                <input
                    value={search}
                  type="search"
                  className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  placeholder="Buscar"
                  onChange = {(event)=> setSearch(event.target.value)} 
                  onKeyDown={handleKeyDown} 
                />
                <Link
                  href={`/biblioteca?q=${search}`}
                  className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span className="sr-only">Search</span>
                </Link>
              </div>
            </div>
          </form>
    </div>
  )
}

export default SearchBar