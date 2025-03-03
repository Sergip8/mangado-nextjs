
import React from "react";
import ItemsRadio from "./ItemsRadio";
import ItemCheckbox from "./ItemCheckbox";

const type = [
  "manga",
  "Manhua",
  "Manhwa",
  "Novela",
  "One shot",
  "Doujinshi",
  "Oel",
];
const demography = ["seinen", "shoujo", "shounen", "josei", "kodomo"];



function FilterSideBar({tags, isMobile, params}:{tags:any, isMobile: boolean, params:any}) {
    
    
  return (
    <div className={`${isMobile? 'w-full': 'w-[220px]'  } overflow-hidden bg-white border border-gray-200  shadow dark:bg-gray-800 dark:border-gray-700`}>
      
      <div>
        <p className="p-2 text-sm font-medium text-gray-900 dark:text-gray-300 dark:bg-slate-600 bg-slate-200">Tipo</p>
        <div className="px-3 py-2">
        <ItemsRadio item={type} param="type" searchParams={params.type}/>

        </div>
      </div>
      <div>
        <p className="p-2 text-sm font-medium text-gray-900 dark:text-gray-300 dark:bg-slate-600  bg-slate-200">
        Demografía

        </p>
        <div className="px-3 py-2">

        <ItemsRadio item={demography} param="demography" searchParams={params.dem}/>
        </div>
      </div>
      <p className=" p-2 text-sm font-medium text-gray-900 dark:text-gray-300 dark:bg-slate-600  bg-slate-200">
        Tematicas
      </p>
      <div className=" px-3 py-2 overflow-y-scroll scroll-smooth scrollbar-ms scrollbar-webkit h-[400px]">
        <ItemCheckbox item={JSON.stringify(tags)} tagsSelected={params.tags}/>
      </div>
    
    </div>
  );
}

export default FilterSideBar;
