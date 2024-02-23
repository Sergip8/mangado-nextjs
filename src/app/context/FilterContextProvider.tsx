'use client'
import { Context, ReactNode, createContext, useContext, useState } from "react";
import { Tag } from "../models/manga";

type filterContextType = {
    tags: number[],
    type: string,
    demography: string,
    search: string,
    showMovilFilter: boolean,
    sort: string,
    setTags: (value:number[]) => void,
    setType: (value: string) => void,
    setDemography: (value: string) => void,
    setSearch: (value: string) => void,
    setShowMovilFilter: (value: boolean) => void,
    setSort: (value: string) => void,
  
}
const filterContextDefault: filterContextType = {
    tags: [],
    type: "",
    demography: "",
    search: "",
    showMovilFilter: false,
    sort: "",
    setTags: () => {},
    setType: () => {},
    setDemography: () => {},
    setSearch: () => {},
    setShowMovilFilter: () => {},
    setSort: () => {},
}
const FilterContext = createContext<filterContextType>(filterContextDefault)

export const ContextProvider = ({children}:{children:ReactNode}) => {

    const [tags, setTags] = useState<number[]>([]);
    const [type, setType] = useState<string>("");
    const [demography, setDemography] = useState<string>("")
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [showMovilFilter, setShowMovilFilter] = useState<boolean>(false)


    return(
        <>
        <FilterContext.Provider value={{
            tags,
            type,
            demography,
            search,
            showMovilFilter,
            sort,
            setTags,
            setType,
            setDemography,
            setSearch,
            setShowMovilFilter,
            setSort
        }}>
            {children}

        </FilterContext.Provider>
        </>
    )
}
export function filterStateContext() {
    return useContext(FilterContext)
}

//export const filterStateContext = () => useContext(FilterContext)

