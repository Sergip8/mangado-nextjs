import React from "react";
import Image from "next/image";
import { montserrat } from "@/app/styles/fonts";

import Link from "next/link";
import { MangaMainInfo } from "@/app/models/manga";

 function Card({manga}: any) {
 console.log(manga)

  return (
    <div className=" bg-[--colors-black] relative rounded-lg text-center h-auto w-[170px]">
      <Link
      className=" cursor-pointer"
      href="/manga/[id]/[name]"
      as={`/manga/${manga?.id}/${manga?.name.replaceAll(" ", "-")}`}
      
      >
      <div className="">
        <Image
          src={manga?.cover} 
          height={0}
          width={0}
          alt={manga?.name}
          sizes="100vw"
          className="h-auto w-[170px] rounded-lg"
         
      
        />
      </div>

      <div
        className={`${montserrat.className} text-white absolute top-0 left-0 right-0 text-center text-xs bg-stone-800 bg-opacity-75 py-2 rounded-t-lg`}
      >
        <p>{manga?.name}</p>
      </div>

      <div className="text-white absolute bottom-0 left-0 right-0 text-center">
        <div className="px-2  bg-zinc-900 bg-opacity-75 rounded-b-lg">
          <div className="text-blue">{manga?.type}</div>
        
        </div>
      </div>
      </Link>
    </div>
  );
}

export default Card;
