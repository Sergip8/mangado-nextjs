"use client";
import { Tag } from '@/app/models/manga';
import React, { useEffect, useState } from 'react'
import {filterStateContext} from "@/app/context/FilterContextProvider"



function ItemCheckbox({item, tagsSelected}:{item: string, tagsSelected:string}) {
  console.log(tagsSelected)
  
  const {tags, setTags} = filterStateContext()
  const itemJson: Tag[] = JSON.parse(item)

  useEffect(()=>{
    if(tagsSelected){
      
      const tagsSelect = tagsSelected.split(",").map(str => {
        return parseInt(str, 10);
      })
      setTags(tagsSelect)
    }
  },[tagsSelected])
  //const [itemsSelected, setItemsSelected] = useState<number[]>([]);
  function setItem(id: number){
  const selected: number[] = []
  selected.push(...tags)
  const index = tags.indexOf(id)
  if(index === -1){
    selected.push(id)
    setTags(selected)
  }
  else{
    selected.splice(index,1)
    setTags(selected)
  }
  console.log(tags)
}
function handleChange(){

}

  
  return (
    <div>
      <ul>
        {itemJson.map((t, i) => (
          <li key={i} onClick={() => setItem(t.id)} className=' cursor-pointer'>
            <div className="flex items-center mb-4">
              <input
               checked={tags.includes(t.id)}
                id="default-radio-1"
                type="checkbox"
                value=""
                onChange={handleChange}
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="cursor-pointer first-letter:capitalize  ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                {t.name}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ItemCheckbox