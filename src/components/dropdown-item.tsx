"use client";

import { filterStateContext } from "@/app/context/FilterContextProvider";
import React, { useEffect, useRef } from "react";
import { useState } from "react";

function DropdownItem({ options, isFilter, params }: { options: any[], isFilter:boolean, params:string }) {
  const [isOpen, setIsOpen] = useState(false);
  const {sort, setSort} = filterStateContext()

  const dropdown = useRef<any>(null);
  useEffect(() => {
    // only add the event listener when the dropdown is opened
    if (!isOpen) return;
    function handleClick(event: any) {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    window.addEventListener("click", handleClick);
    // clean up
    return () => window.removeEventListener("click", handleClick);
  }, [isOpen]);
  return (
    <div ref={dropdown}>
      {/* <button
        onClick={() => setIsOpen((o) => !o)}
        className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
        type="button"
      >{isFilter && sort !="" &&
      <div>
        Ordenar por
      </div>
      }
      {!isFilter && 
      <div>
        Buscar en
      </div>
      }
       
        <svg
          className="w-2.5 h-2.5 ms-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {isOpen && (
        <div
          id="dropdown"
          className="absolute z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdown-button"
          >
            {options.map((option, index) => (
              <li
                key={index}
                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <button type="button">{option}</button>
              </li>
            ))}
          </ul>
        </div>
      )} */}
      
<select defaultValue={params} onChange={(e) => setSort(e.target.value)} className={`${isFilter? 'rounded-lg':'rounded-s-lg'} flex-shrink-0 z-10 inline-flex py-[11px] px-4 text-sm font-medium text-gray-900 bg-slate-50 border border-gray-300  hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600`}>
  <option hidden>
        Ordenar por
  </option>
  {options.map((o,i) => (
  <option key={i} value={o}>{o}</option>
  ))}
</select>
    </div>
  );
}

export default DropdownItem;
