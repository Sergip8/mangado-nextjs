
import React from 'react'
import Card from './Card'
import { MangaMainInfo } from '@/app/models/manga'

function SideBarDetails({suggested}:{suggested: MangaMainInfo[]} ) {
    
  return (
    <div>
      {suggested.map((m, i) => (
              <div key={i} className="mx-2 my-2">
                <Card manga={m} />

              </div>
            ))}

    </div>
  )
}

export default SideBarDetails
