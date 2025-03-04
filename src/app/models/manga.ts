
export interface Manga{
    id: number
    name: string
    type: string
    score: string
    cover: string
    year: string
    description: string
    alt_titles: string
    other_titles: string
    authors: any
    tags: any
    mangaId: string
}
export interface Chapter{
    id: number
    name: string
    numero: number
}
export interface Page{
    id: number
    link: string
    chapterId: number
    page_num: number
}
export interface Tag{
    id: number
    name: string
}
export interface MangaMainInfo{
    id: number
    name: string
    type: string
    score: string
    cover: string
    status: string
}

