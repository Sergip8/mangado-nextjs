import { MangaMainInfo } from '@/app/api/mangas/route'
import React from 'react'
import Card from './Card'

function SideBarDetails({suggested}:{suggested: MangaMainInfo[]} ) {
    
  return (
    <div>
      {suggested.map((m, i) => (
              <div key={i} className="mx-2 my-2">
                <Card {...m} />

              </div>
            ))}

    </div>
  )
}

export default SideBarDetails
