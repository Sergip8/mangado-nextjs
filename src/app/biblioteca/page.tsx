import FilterSideBar from '@/components/FilterSideBar'
import FilterTopbar from '@/components/FilterTopbar'
import Navbar from '@/components/Navbar'
import React from 'react'
import { ContextProvider } from '../context/FilterContextProvider'
import { conn } from '@/libs/mysql'

import Card from '@/components/Card'
import { MangaMainInfo, Tag } from '../models/manga'
import { RowDataPacket } from 'mysql2/promise'
import Pagination from '@/components/Pagination'

const sort_conv = {
  "A-Z": "name ASC",
  "Z-A": "name DESC",
  "Num Capitulos":""

}

const limit = 20
const DIGIT_EXPRESSION = /^\d$/;

async function getFilterResults(params:any, offset: number) {
  let tags:number[] = []
  let author = ""
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
  let sort= ""
  let sort_str: "A-Z" | "Z-A" |"Num Capitulos" | "" = ""
  let  sort_capQ1 = ""
  let  sort_capQ2 = ""
  let  sort_capQ3 = ""

  
    if(params.type){
        type = `AND type = '${params.type.toUpperCase()}'`
    }
    if(params.dem){
      dem = `AND demography = '${params.dem.toUpperCase()}'`
    }
    if(params.sort){
      if(sort_conv.hasOwnProperty(params.sort)){
        sort_str = params.sort
        if(sort_str === "A-Z")
        sort = `ORDER BY name ASC`
      if(sort_str === "Z-A")
      sort = `ORDER BY name DESC`
    if(sort_str === "Num Capitulos"){
      sort_capQ1 = "m."
      sort_capQ2 = " m join manga_details md on m.id = md.mangaId "
      sort_capQ3 = "order by md.num_chapters ASC"
    }
  }
  console.log(sort)
}
if(tags.length>0){
  tagsQ = `AND id IN (SELECT manga FROM manga_tag WHERE tag IN (${tags.join()}))`
  console.log(tagsQ)
}
if(params.author){
  author = `AND id IN (SELECT manga FROM manga_author WHERE author IN  (${params.author}))`
  
}

  
try {
  console.log(`SELECT ${sort_capQ1}* FROM manga_main_info ${sort_capQ2} WHERE name LIKE ? ${type} ${dem} ${author} ${tagsQ} ${sort} ${sort_capQ3}`)
  const [res] = await conn.query<RowDataPacket[]>(`SELECT ${sort_capQ1}* FROM manga_main_info ${sort_capQ2} WHERE name LIKE ? ${type} ${dem}  ${author} ${tagsQ} ${sort} ${sort_capQ3} LIMIT ${limit} OFFSET ${offset}`,[
    `%${search}%`
  ])
  const [count]  = await conn.query<RowDataPacket[]>(`SELECT count(*) as count FROM manga_main_info ${sort_capQ2} WHERE name LIKE ? ${type} ${dem} ${author} ${tagsQ} ${sort} ${sort_capQ3} `,[
    `%${search}%`
  ])
  const page= count[0]["count"]/limit
  return {res:res,page:page}
} catch (error) {
  return []
}
}


async function Biblioteca({ searchParams  }:{searchParams :any}) {
  let page = 0
  const offset = ():number =>{
    if(searchParams){
      if(searchParams.page && DIGIT_EXPRESSION.test(searchParams.page)){
        page =Number.parseInt(searchParams.page)-1
        if(page >=0){
          if(page == 0){
            return 0
          }
          else{
            return (limit*page)+1
          }

        }
        return 0
      }
      return 0
    }
    return 0
  } 
  const _offset = offset()
  let results:any = {}
  
  if(searchParams){
    if(searchParams.type != "" || searchParams.tags !== "" || searchParams.dem !="" || searchParams.q !=""  ){
      results = await getFilterResults(searchParams, _offset)
      
    }
  }
  async function loadTags() {
    try {
      return await conn.execute("SELECT tags.name, tags.id FROM tags")
    } catch (error) {
      console.log(error)
      return []
    }
    
}
  console.log(searchParams)
  const [tags] = await loadTags()
 
  return (
    <div className='container mx-auto '>
        <Navbar isView={false}/>
        <ContextProvider>
        <div className='mt-[80px]'>
        <FilterTopbar tagsf={JSON.stringify(tags)} params={searchParams}/>
        <div className='flex h-fit'>
        <div className='hidden md:flex'>
        <FilterSideBar tags={tags} isMobile={false} params={searchParams}/>

          </div>
          <div className='block h-full'>
            {results.res.length>0 &&
            
          <div className='flex flex-wrap h-[270px]'>
              {results.res.map((r:MangaMainInfo, i:number) => (
                <div key={i} className='m-2 '>
  
                  <Card  manga={r}/>
                </div>
  
              ))}

{Math.ceil(results.page)>1 &&
<div className='w-full text-center'>
<Pagination page={page} num_pages={Math.ceil(results.page)}/>
</div>
}
            </div>
}

          </div>
          
        

        </div>

        </div>
        </ContextProvider>
    </div>
  )
}

export default Biblioteca