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
import  {getConnection } from "@/libs/mssql";
import sql from "mssql";

const sort_conv = {
  "A-Z": "name ASC",
  "Z-A": "name DESC",
  "Num Capitulos":""

}

const limit = 20
const DIGIT_EXPRESSION = /^\d$/;

async function getFilterResults(params: any, offset: number, limit: number) {
  let tags: number[] = [];
  let author = "";
  const search = params.q || "";

  // Convertir tags a números
  if (params.tags) {
    const tagSplit = params.tags.split(",");
    tags = tagSplit.map((t: string) => parseInt(t)).filter((t:any) => !isNaN(t)); // Filtra valores no numéricos
  }

  let type = "";
  let dem = "";
  let tagsQ = "";
  let sort = "ORDER BY id";
  let sort_capQ2 = "";

  // Filtrar por tipo
  if (params.type) {
    type = `AND type = '${params.type.toUpperCase()}'`;
  }

  // Filtrar por demografía
  if (params.dem) {
    dem = `AND demography = '${params.dem.toUpperCase()}'`;
  }

  // Ordenar resultados
  if (params.sort) {
    const sort_conv: { [key: string]: string } = {
      "Nombre": "name ASC",
      "Fecha de lanzamiento": "release_date ASC",
      "Num Capitulos": "md.num_chapters ASC",
    };

    if (sort_conv.hasOwnProperty(params.sort)) {
      const sort_str = params.sort;
      sort = `ORDER BY ${sort_conv[sort_str]}`;

      if (sort_str === "Num Capitulos") {
        sort_capQ2 = "JOIN manga_details md ON m.id = md.mangaId";
      }
    }
  }

  // Filtrar por tags
  if (tags.length > 0) {
    tagsQ = `AND m.id IN (SELECT manga FROM manga_tag WHERE tag IN (${tags.join(",")}))`;
  }

  // Filtrar por autor
  if (params.author) {
    const authorIds = params.author.split(",").map((a: string) => parseInt(a)).filter((a:any) => !isNaN(a)); // Convertir a números
    if (authorIds.length > 0) {
      author = `AND m.id IN (SELECT manga FROM manga_author WHERE author IN (${authorIds.join(",")}))`;
    }
  }

  const pool = await getConnection(); // Obtener conexión
  try {

    // Consulta principal
    let query = `
      SELECT m.* 
      FROM manga_main_info m 
      ${sort_capQ2} 
      WHERE name LIKE @search 
      ${type} 
      ${dem} 
      ${author} 
      ${tagsQ} 
      ${sort} 
      OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
    `;

    const result = await pool
      .request()
      .input("search", `%${search}%`)
      .input("offset", offset)
      .input("limit", limit)
      .query(query);

    // Consulta para contar el total de registros
    let countQuery = `
      SELECT COUNT(*) AS count 
      FROM manga_main_info m 
      ${sort_capQ2} 
      WHERE name LIKE @search 
      ${type} 
      ${dem} 
      ${author} 
      ${tagsQ}
    `;

    const countResult = await pool
      .request()
      .input("search", `%${search}%`)
      .query(countQuery);

    const totalCount = countResult.recordset[0].count;
    const totalPages = Math.ceil(totalCount / limit); // Calcular el número total de páginas

    return { res: result.recordset, totalPages: totalPages };
  } catch (error) {
    console.error("Error in getFilterResults:", error);
    return { res: [], totalPages: 0 };
  }
}
async function loadTags() {
  let pool; // Declarar la conexión fuera del try para poder cerrarla en el finally
  try {
      pool = await getConnection(); // Obtener la conexión a la base de datos
      const result = await pool.request().query("SELECT tags.name, tags.id FROM tags");
      return result.recordset; // Devolver los registros obtenidos
  } catch (error) {
      console.error("Error in loadTags:", error); // Usar console.error para errores
      return []; // Devolver un array vacío en caso de error
  } 
}

async function Biblioteca({ searchParams  }:{searchParams :any}) {
  let page = 0
  const tags = await loadTags()
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
      results = await getFilterResults(searchParams, _offset, limit)
      
    }
  }
  
  console.log(searchParams)
 
 
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