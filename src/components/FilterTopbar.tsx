"use client"
import React, { useEffect, useRef, useState } from "react";
import DropdownItem from "./dropdown-item";
import { filterStateContext } from "@/app/context/FilterContextProvider";
import Link from "next/link";
import Image from "next/image";
import FilterSideBar from "./FilterSideBar";
import { Tag } from "@/app/models/manga";
import { useRouter } from 'next/navigation';
const options = [
    "A-Z",
    "Z-A",
    "Num Capitulos"
]

function FilterTopbar({tagsf, params}:{tagsf:string, params:any}) {
  const {type, tags, demography, search,  setSearch, sort} = filterStateContext()
  const [showMovilFilter, setShowMovilFilter] = useState(false)
  const filter = useRef<any>(null);
  const tagsT = JSON.parse(tagsf)
  const router = useRouter();
  function handleKeyDown(event: any) {
        
    if (event.key === 'Enter') {
        event.preventDefault()
        router.push(`/biblioteca?type=${type}&tags=${tags.toString()}&dem=${demography}&q=${search}&sort=${sort}`);
   }
 }

  
  useEffect(() => {
    // only add the event listener when the dropdown is opened
    if (!showMovilFilter) return;
    function handleClick(event: any) {
      if (filter.current && !filter.current.contains(event.target)) {
        setShowMovilFilter(false);
      }
    }
    window.addEventListener("click", handleClick);
    // clean up
    return () => window.removeEventListener("click", handleClick);
  }, [showMovilFilter]);
  
  function getValueParams(){
    console.log(type)
    console.log(tags)
    console.log(demography)

  }
  console.log(search)

  return (
    <div>
      <div className=" flex items-center justify-between flex-wrap dark:bg-slate-600 bg-slate-50 py-2 px-4">
       <div className="hidden md:flex">
       <Link href={`/biblioteca?type=${type}&tags=${tags.toString()}&dem=${demography}&sort=${sort}`} className="text-center block border border-blue-800 rounded py-2 px-11 bg-blue-700 hover:bg-blue-500 text-white" >Aplicar filtros</Link>
       </div>
       <div ref={filter}>
       <div className="flex md:hidden">
       <Image
        onClick={() => setShowMovilFilter(sf => !sf)}
              src="/icon-filter.svg"
              width={30}
              height={30}
              alt="Shopping Cart Icon"
            />
       </div>
       {showMovilFilter &&
       <div  className={`${
          showMovilFilter ? "opacity-100 delay-300" : "opacity-0 delay-0"
        } absolute w-9/12 left-0 top-[125px] z-50 transition-all duration-300 ease-in-out`}>
          <FilterSideBar  tags={tagsT} isMobile={true} params={params}/>
          <Link href={`/biblioteca?type=${type}&tags=${tags.toString()}&dem=${demography}&sort=${sort}`} className="text-center block border border-blue-800 py-2 px-11 bg-blue-700 hover:bg-blue-500 text-white" >Aplicar filtros</Link>
       </div>
       }

       </div>
       
      <div className="w-6/12">
            <div className="flex">
              
              <div className="relative w-full">
                <input
                  type="search"
                  value={search}
                  className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-300 border-s-1 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  placeholder="Search filter results"
                  onChange={(e)=>{e.preventDefault(); setSearch(e.target.value)}}
                  onKeyDown={handleKeyDown} 
                />
                <a
                  type="button"
                  href={`/biblioteca?type=${type}&tags=${tags.toString()}&dem=${demography}&q=${search}&sort=${sort}`}
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
                </a>
              </div>
            </div>
          </div>
              <div>

              <DropdownItem options={options} isFilter={true} params={params.sort}/>

              </div>
        
      </div>
    </div>
  );
}

export default FilterTopbar;
