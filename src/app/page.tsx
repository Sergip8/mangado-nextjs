import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import { conn } from "@/libs/mysql";
import { MangaMainInfo } from "./models/manga";
import { RowDataPacket } from "mysql2/promise";
import Pagination from "@/components/Pagination";

const limit = 20
const DIGIT_EXPRESSION = /^\d$/;
async function mangas(offset: number) {
 
  try {
    const [results] = await conn.execute<RowDataPacket[]>(`SELECT * FROM manga_main_info LIMIT ${limit} OFFSET ${offset}`);
    
    return results
    
  } catch (error) {
    return []
  }
}
async function mangasCount() {
 
  try {
    const [count] = await conn.execute<RowDataPacket[]>(`SELECT COUNT(*) as count FROM manga_main_info`);
    console.log(count)
    
    return count[0]["count"]/limit
    
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
            {mangasList.map((m,i) => (
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
