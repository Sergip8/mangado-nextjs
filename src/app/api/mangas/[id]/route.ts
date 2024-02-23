import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";
import { MangaMainInfo } from "../route";



export async function GET(req: Request, { params }: { params: { id: number } }){
   
    
    try {
        const res = await conn.query<MangaMainInfo[]>("SELECT * FROM manga_main_info WHERE id = ?", [
            params.id
        ])
        if(res.length === 0){
            return NextResponse.json({
                message: "Esta monda no existe",
                status: 404
            })
        }
        return NextResponse.json(res)
    } catch (error) {
        return NextResponse.json({
            message: error,
            status: 500
        }
        )
    }
}