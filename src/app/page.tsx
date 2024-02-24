import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import { conn } from "@/libs/mysql";
import { MangaMainInfo } from "./models/manga";


async function mangas() {
  try {
    
    return await conn.query<MangaMainInfo[]>("SELECT * FROM manga_main_info");
    
  } catch (error) {
    console.log(error)
    return []
  }finally{
    conn.end()
  }
}

export default async function Home() {
  const mangasList = await mangas();
  
  return (
    <main>
      <div>
        <Navbar  isView={false}/>
        <div className="container mx-auto px-4 mt-[100px]">
          <div className="flex flex-wrap ">
            {mangasList.map((m,i) => (
              <div key={i} className="mx-2 my-2">
                <Card  {...m} />

              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
