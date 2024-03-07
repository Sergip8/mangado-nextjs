import React from 'react'
import DetailsCard from"@/components/details-card"
import Navbar from '@/components/Navbar'
import { conn } from "@/libs/mysql";
import ChapterList from '@/components/chapter-list';
import SideBarDetails from '@/components/SideBarDetails';

async function loadMangaDetails(mangaId) {
  return await conn.query("SELECT manga_main_info.*, manga_details.* FROM manga_main_info JOIN manga_details ON manga_main_info.id = ?", [
    mangaId,
  ]);
}
async function loadMangaTags(mangaId) {
  return await conn.query("SELECT DISTINCT tags.* FROM manga_main_info JOIN manga_tag ON manga_tag.manga = ?  JOIN tags ON manga_tag.tag = tags.id ", [
    mangaId,
  ]);
}
async function loadMangaAuthors(mangaId) {
  return await conn.query("SELECT DISTINCT authors.* FROM manga_main_info JOIN manga_author ON manga_author.manga = ?  JOIN authors ON manga_author.author = authors.id ", [
    mangaId,
  ]);
}
async function loadChapters(mangaId){
  const data = await conn.query("SELECT chapters.name, chapters.numero, chapters.id FROM chapters WHERE chapters.mangaId = ?",[
    mangaId
  ])
  return data
}
async function loadMangaSuggested(mangaId) {
  try {
    return await conn.query("SELECT mmi.* FROM manga_main_info mmi JOIN( SELECT COUNT(1) AS count1, pt1.manga FROM manga_tag pt1  WHERE tag in (select tag from manga_tag WHERE manga = ?) AND manga != ? GROUP BY pt1.manga ORDER BY count1 DESC) as m_selected on m_selected.manga = mmi.id limit 4", [
      mangaId,
      mangaId,
    ]);
    
  } catch (error) {
    return []
  }finally{
    

  }
}


async function DetailsMangaPage({params}) {
  const [mangaDetails] = await loadMangaDetails(params.id)
  const [tags] = await loadMangaTags(params.id)
  const [chapters] = await loadChapters(params.id)
  const [suggested] = await loadMangaSuggested(params.id)
  const [authors] = await loadMangaAuthors(params.id)
  
  mangaDetails[0]["tags"] = tags
  mangaDetails[0]["authors"] = authors
  return (
    <div>
        <Navbar isView={false}/>
        <div className='mt-[100px]'>
        <DetailsCard {...mangaDetails[0]}/>
        <div className='container mx-auto md:px-[100px] flex justify-around'>
        <ChapterList chapters ={chapters} params={params}/>
        <div className=' '>
        <SideBarDetails suggested={suggested}/>

        </div>
        </div>
        </div>
    </div>
  )
}

export default DetailsMangaPage