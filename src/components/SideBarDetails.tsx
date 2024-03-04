
import React from 'react'
import Card from './Card'
import { MangaMainInfo } from '@/app/models/manga'

function SideBarDetails({suggested}:{suggested: MangaMainInfo[]} ) {
    
  return (
    <div>
      <h3>Recomendados</h3>
      <div className='sm:grid-cols-2 grid'>
      {suggested.map((m, i) => (
              <div key={i} className="mx-2 my-2 ">
                <Card manga={m} />

              </div>
            ))}

      </div>

    </div>
  )
}
"mangado_admin   fVW!3hMG!?QEQ#c"
export default SideBarDetails
