import React from "react";
import Image from "next/image";
import { Manga } from "@/app/models/manga";
import Link from "next/link";


function DetailsCard(manga: Manga) {
  const altNames = [];
 
  if (manga.alt_titles) {
    altNames.push(...manga.alt_titles.split(","));
  }
  


  return (
    <div className="container mx-auto">
    <div className="flex justify-center">
      <div
        // style={{
        //   backgroundImage: `url("/details-background.jpg")`,
        //   backgroundRepeat: "no-repeat 50% 50%",
        //   width: "100%",
        // }}
      >
        <div className="">

          
          <div className=" justify-center dark:text-white text-gray-800  md:flex gap-x-14 p-5 ">
            <div className="flex flex-col justify-center text-center md:w-3/12">
              <Image
                src={manga.cover}
                height={0}
                width={290}
                alt={manga.name}
                className="w-full"
              />
              <div className=" font-bold dark:bg-slate-800 bg-slate-300 dark:text-white text-gray-800">
                {manga.type}
              </div>
            
            </div>
            <div className="w-full">
                <div className="capitalize text-4xl">
                <h1>{manga.name}</h1>
                </div>
                <div className="text-2xl text-gray-400">
                  <p>{manga.year}</p>
                </div>
                <hr className="h-1 mx-auto my-4 bg-gray-500 border-0 rounded  dark:bg-gray-200"></hr>
                <div>
                  <p>
                    {manga.description}
                  </p>
                </div>
              <div>
                {/* {altNames && (
                  <div className="flex">
                    {altNames.map((n) => (
                      <div className=" bg-slate-50 rounded-lg mx-2 p-1">
                        {n}
                      </div>
                    ))}
                  </div>
                )} */}
              </div>
              <div>
                {manga.tags.length > 0 && (
                  <div className=" gap-2 flex flex-wrap items-center mt-3">
                     <div>
                        Tags:
                      </div>
                    {manga.tags.map((n:any,i:number) => (

                      <Link href={`/biblioteca?tags=${[n.id]}`} key={i} className=" mx-2 px-2 bg-slate-400 rounded-sm">
                        {n.name}
                      </Link>

                      
                    ))}
                  </div>
                )}
                {manga.authors.length > 0 && (
                  <div className=" gap-2 flex flex-wrap items-center mt-3">
                     <div>
                        Autores:
                      </div>
                    {manga.authors.map((n:any,i:number) => (

                      <Link href={`/biblioteca?author=${[n.id]}`} key={i} className=" mx-2 px-2 bg-slate-400 rounded-sm">
                        {n.type}: {n.name}
                      </Link>

                      
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    <hr className="h-1 mx-auto my-4 bg-gray-500 border-0 rounded  dark:bg-gray-200"></hr>
    
    </div>
  );
}

export default DetailsCard;
