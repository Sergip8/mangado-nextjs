import { NextResponse } from "next/server";
import {conn} from "@/libs/mysql"

export interface MangaMainInfo{
    id: number
    name: string
    type: string
    score: string
    cover: string
}


export async function GET(){
   
    try {
        const res = await conn.query<MangaMainInfo[]>("SELECT * FROM manga_main_info")
        return NextResponse.json(res)
    } catch (error) {
        return NextResponse.json({
            message: error,
            status: 500
        }
        )
    }
    

}
export async function POST(request: Request){
    const {name, type, cover, score} = await request.json()
    const res = await conn.query("INSERT INTO manga_main_info SET ?", {
        name: name,
        type: type,
        cover: cover,
        score: score
    })
    console.log(res)
    return NextResponse.json({name: "one fuck man", year: 2012})
}