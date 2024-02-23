"use client"
import { filterStateContext } from '@/app/context/FilterContextProvider'
import React, { useEffect } from 'react'

function ItemsRadio({item, param, searchParams}:{item: string[], param:string, searchParams:string}) {
  const {type, setType, demography, setDemography} = filterStateContext()

  useEffect(()=>{
    if(searchParams){
      
      if(param === "type"){
      setType(searchParams)
    }
      if(param === "demography"){
      setDemography(searchParams)
    }
  }
  },[searchParams])

  function itemSelect(value: string){
    if(param === "type"){
      if(type === value)
      setType("")
      else
      setType(value)
    }
    else{
      if(value === demography)
      setDemography("")
    else
    setDemography(value)
    }
    console.log(type)
    console.log(demography)
    
  }

  function handleChange(){

  }
  return (
    <div>
         <ul>
        {item.map((t, i) => (
          <li key={i} onClick={() => itemSelect(t)}>
            <div className="flex items-center mb-4 max-w-fit">
             
             
             <input
                checked={t=== type || t ===demography}
                id="default-radio-1"
                type="checkbox"
                value=""
                onChange={handleChange}
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="first-letter:capitalize ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                {t}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ItemsRadio