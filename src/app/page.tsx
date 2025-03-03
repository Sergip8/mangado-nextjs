import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import { MangaMainInfo } from "./models/manga";
import { RowDataPacket } from "mysql2/promise";
import Pagination from "@/components/Pagination";
import  {getConnection } from "@/libs/mssql";
import sql from "mssql";


const limit = 20

const DIGIT_EXPRESSION = /^\d$/;
async function mangas(offset: number ) {
 
  try {
    const query = `
      SELECT * FROM manga_main_info 
      ORDER BY id 
      OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
    `;
  
    const pool = await getConnection();
    const results = await pool
      .request()
      .input("offset", sql.Int, offset)
      .input("limit", sql.Int, limit)
      .query(query);
  
    console.log(results.recordset);
    return results.recordset; // Devuelve solo los datos sin metadatos
  } catch (error) {
    console.error("Error ejecutando la consulta:", error);
    return [];
  }
}
async function mangasCount() {
  try {
    const countQuery = `
      SELECT COUNT(*) AS count FROM manga_main_info
    `;
    const pool = await getConnection()
    const countResult = pool
      .request()
      .query(countQuery);

    console.log("count: " + countResult.recordset[0].count);

    return countResult.recordset[0].count / limit;
    
  } catch (error) {
    return 0
  }
}

export default async function Home({searchParams}:{searchParams:any}) {
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
  const mangasList = await mangas(_offset);
  const numPages = await mangasCount()
  return (
    <main>
      <div>
        <Navbar  isView={false}/>
        <div className="container mx-auto px-4 mt-[100px]">
          <div className="flex flex-wrap ">
            {mangasList.map((m:any,i:number) => (
              <div key={i} className="mx-2 my-2">
                <Card  manga={m} />

              </div>
            ))}
          </div>
            <Pagination page={page} num_pages={Math.ceil(numPages)}/>
        </div>
      </div>
    </main>
  );
}
