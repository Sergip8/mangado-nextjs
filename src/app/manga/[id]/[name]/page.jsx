import React from 'react'
import DetailsCard from"@/components/details-card"
import Navbar from '@/components/Navbar'
import { conn } from "@/libs/mysql";
import ChapterList from '@/components/chapter-list';
import SideBarDetails from '@/components/SideBarDetails';
import  {getConnection } from "@/libs/mssql";
import sql from "mssql";



async function loadMangaDetails(mangaId) {
  const pool = await getConnection();
  const result = await pool.request()
      .input('mangaId', sql.Int, mangaId)
      .query("SELECT manga_main_info.*, manga_details.* FROM manga_main_info JOIN manga_details ON manga_main_info.id = @mangaId");
  return result.recordset;
}

async function loadMangaTags(mangaId) {
  const pool = await getConnection();
  const result = await pool.request()
      .input('mangaId', sql.Int, mangaId)
      .query("SELECT DISTINCT tags.* FROM manga_main_info JOIN manga_tag ON manga_tag.manga = @mangaId JOIN tags ON manga_tag.tag = tags.id");
  return result.recordset;
}

async function loadMangaAuthors(mangaId) {
  const pool = await getConnection();
  const result = await pool.request()
      .input('mangaId', sql.Int, mangaId)
      .query("SELECT DISTINCT authors.* FROM manga_main_info JOIN manga_author ON manga_author.manga = @mangaId JOIN authors ON manga_author.author = authors.id");
  return result.recordset;
}

async function loadChapters(mangaId) {
  const pool = await getConnection();
  const result = await pool.request()
      .input('mangaId', sql.Int, mangaId)
      .query("SELECT chapters.name, chapters.numero, chapters.id FROM chapters WHERE chapters.mangaId = @mangaId");
  return result.recordset;
}

async function loadMangaSuggested(mangaId) {
  try {
      const pool = await getConnection();
      const result = await pool.request()
          .input('mangaId', sql.Int, mangaId)
          .query(`
              SELECT mmi.* 
              FROM manga_main_info mmi 
              JOIN (SELECT COUNT(1) AS count1, pt1.manga 
                    FROM manga_tag pt1  
                    WHERE tag IN (SELECT tag FROM manga_tag WHERE manga = @mangaId) 
                    AND manga != @mangaId 
                    GROUP BY pt1.manga 
                    ORDER BY count1 DESC) AS m_selected 
              ON m_selected.manga = mmi.id 
              LIMIT 4`);
      return result.recordset;
  } catch (error) {
      console.error(error);
      return [];
  }
}


async function DetailsMangaPage({params}) {
  const mangaDetails= await loadMangaDetails(params.id)
  const tags = await loadMangaTags(params.id)
  const chapters = await loadChapters(params.id)
  const suggested = await loadMangaSuggested(params.id)
  const authors = await loadMangaAuthors(params.id)
  
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