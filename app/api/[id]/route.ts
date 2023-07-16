import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";



const prisma=new PrismaClient()

export const GET=async(req:NextRequest,contex:{params:{id:string}})=>{
        const id =Number(contex.params.id)||0
        console.log("idnya : ",id)
        
        const image=await prisma.images.findFirst({
            where:{
                id:id
            }
        })

        if(!image){
            return NextResponse.json({message:"error"},{status:404})
        }
        return NextResponse.json(image)

}