import FilterSideBar from '@/components/FilterSideBar'
import FilterTopbar from '@/components/FilterTopbar'
import Navbar from '@/components/Navbar'
import React from 'react'
import { ContextProvider } from '../context/FilterContextProvider'
import { conn } from '@/libs/mysql'

import Card from '@/components/Card'
import { MangaMainInfo, Tag } from '../models/manga'


async function getFilterResults(params:any) {
  let tags:number[] = [0]
  const search = params.q || ""
  if(params.tags){
    const tagSplit:string[] = params.tags.split(",")
  
    tags = tagSplit.map(t =>{
      return +t
    })
  }
  let type = ""
  let dem = ""
  let tagsQ = ""
  console.log(tags)
  console.log(search)

  if(params){
    if(params.type){
        type = `AND type = '${params.type.toUpperCase()}'`
    }
    if(params.dem){
      dem = `AND demography = '${params.dem.toUpperCase()}'`
    }
    if(params.tags){
      tagsQ = `AND id IN (SELECT manga FROM manga_tag WHERE tag IN (${params.tags}))`
    }
  }
try {
  return await conn.query<MangaMainInfo[]>(`SELECT * FROM manga_main_info WHERE name LIKE ? ${type} ${dem} ${tagsQ}`,[
    `%${search}%`
  ])
  
} catch (error) {
  return []
}
  finally{
    conn.end()
  }
}


async function Biblioteca({ searchParams  }:{searchParams :any}) {
  let results:MangaMainInfo[] = []
  
  if(searchParams){
    if(searchParams.type != "" || searchParams.tags !== "" || searchParams.dem !="" || searchParams.q !=""  ){
      results = await getFilterResults(searchParams)
      console.log(results)
      
    }
  }
  async function loadTags() {
    try {
      return await conn.query<Tag[]>("SELECT tags.name, tags.id FROM tags")
    } catch (error) {
      return []
    }finally{
      conn.end()
    }
    
}
  console.log(searchParams)
  const tags = await loadTags()
  
  return (
    <div className='container mx-auto'>
        <Navbar isView={false}/>
        <ContextProvider>
        <div className='mt-[80px]'>
        <FilterTopbar tagsf={JSON.stringify(tags)} params={searchParams}/>
        <div className='flex'>
        <div className='hidden md:flex'>
        <FilterSideBar tags={tags} isMobile={false} params={searchParams}/>

          </div>
          <div className='flex flex-wrap h-[270px]'>
            {results.map((r, i) => (
              <div key={i} className='m-2'>

                <Card  {...r}/>
              </div>

            ))}
          </div>
        

        </div>

        </div>
        </ContextProvider>
    </div>
  )
}

export default Biblioteca