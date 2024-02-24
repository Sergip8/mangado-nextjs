import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import { conn } from "@/libs/mysql";
import { MangaMainInfo } from "./models/manga";
import { RowDataPacket } from "mysql2/promise";


async function mangas() {
  try {
    const [results] = await conn.execute<RowDataPacket[]>("SELECT * FROM manga_main_info");
    return results
    
  } catch (error) {
    return []
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
                <Card  manga={m} />

              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
