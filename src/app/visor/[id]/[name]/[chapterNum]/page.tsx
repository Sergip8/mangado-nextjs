import { conn } from "@/libs/mysql";
import React from "react";
import Image from "next/image";
import { Chapter, Page } from "@/app/models/manga";
import Navbar from "@/components/Navbar";
import ChapterListSelect from "@/components/ChapterListSelect";
import PrevNext from "@/components/PrevNext";
import Link from "next/link";
import  {getConnection } from "@/libs/mssql";


async function loadChapterPages(mangaId: number, cap_num: number) {
  let pool; // Declarar la conexión fuera del try para poder cerrarla en el finally
  try {
      pool = await getConnection(); // Obtener la conexión a la base de datos

      const query = `
          SELECT pages.* 
          FROM chapters_img AS pages 
          JOIN chapters ON chapters.mangaId = @mangaId AND chapters.numero = @cap_num 
          WHERE pages.chapterId = chapters.id
      `;

      const result = await pool.request()
          .input("mangaId", mangaId)
          .input("cap_num", cap_num)
          .query(query);

      return result.recordset; // Devolver los registros obtenidos
  } catch (error) {
      console.error("Error in loadChapterPages:", error); // Registrar el error
      return []; // Devolver un array vacío en caso de error
  } finally {
      
  }
}

async function loadChapterList(mangaId: number) {
  let pool; // Declarar la conexión fuera del try para poder cerrarla en el finally
  try {
      pool = await getConnection(); // Obtener la conexión a la base de datos

      const query = `
          SELECT chapters.* 
          FROM chapters 
          WHERE chapters.mangaId = @mangaId
      `;

      const result = await pool.request()
          .input("mangaId", mangaId)
          .query(query);

      return result.recordset; // Devolver los registros obtenidos
  } catch (error) {
      console.error("Error in loadChapterList:", error); // Registrar el error
      return []; // Devolver un array vacío en caso de error
  } finally {
   
  }
}
async function loadMangaInfo(mangaId: number) {
  let pool;
  try {
      pool = await getConnection(); 

      const query = `
          SELECT manga_main_info.name, manga_main_info.id 
          FROM manga_main_info 
          WHERE id = @mangaId
      `;

      const result = await pool.request()
          .input("mangaId", mangaId)
          .query(query);

      return result.recordset[0] || {};
  } catch (error) {
      console.error("Error in loadMangaInfo:", error); 
      return {}; 
  } finally {
    
  }
}

async function ViewChapter({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const pages = await loadChapterPages(params.id, params.chapterNum);
  const chapterList = await loadChapterList(params.id);
  const mangaData  = await loadMangaInfo(params.id);
  console.log(pages)
  return (
    <div>
      <Navbar isView={true}/>
      <div className="hero container max-w-screen-lg mx-auto pb-10 mt-[20px]">
        
        <div>
          <h1 className="text-4xl font-bold mb-2">{mangaData.name}</h1>
        </div>

    
        <div className="md:flex justify-around items-center py-2">
        <Link
              href="/manga/[mangaId]/[name]"
              as={`/manga/${mangaData.id}/${mangaData.name.replaceAll(
                " ",
                "-"
              )}`}
            >
              <svg className=" text-slate-600 dark:text-slate-100 fill-current h-6 w-6" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><g strokeLinecap="round" strokeLinejoin="round"/><g id="SVGRepo_iconCarrier"><path d="M222.927 580.115l301.354 328.512c24.354 28.708 20.825 71.724-7.883 96.078s-71.724 20.825-96.078-7.883L19.576 559.963a67.846 67.846 0 01-13.784-20.022 68.03 68.03 0 01-5.977-29.488l.001-.063a68.343 68.343 0 017.265-29.134 68.28 68.28 0 011.384-2.6 67.59 67.59 0 0110.102-13.687L429.966 21.113c25.592-27.611 68.721-29.247 96.331-3.656s29.247 68.721 3.656 96.331L224.088 443.784h730.46c37.647 0 68.166 30.519 68.166 68.166s-30.519 68.166-68.166 68.166H222.927z"/></g></svg>
        </Link>
          <div>
            <PrevNext
              chapters={chapterList.reverse().map((c) => c.numero)}
              params={params}
              searchParams={searchParams}
            />
          </div>

          <div className="flex items-center gap-5">
           
            <ChapterListSelect chapters={JSON.stringify(chapterList)} mangaName={mangaData.name} mangaId={mangaData.id} screenParam={searchParams.screen} chapterParam={params.chapterNum}/>
          </div>
        </div>
      </div>
      {pages.map((p:any, i:number) => (
        <div key={i}>
          <Image
            priority={i < 4}
            
            src={p.link}
            width={0}
            height={0}
            sizes="100vw"
            alt={mangaData.name}
            className={
              !searchParams.screen || searchParams.screen === "adjust"
                ? "md:container md:mx-auto md:w-9/12 w-full"
                : "w-full"
            }
          />
        </div>
      ))}
    </div>
  );
}

export default ViewChapter;
