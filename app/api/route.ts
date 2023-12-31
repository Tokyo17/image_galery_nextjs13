import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma=new PrismaClient()

export const GET =async(req:NextRequest)=>{
    const images=await prisma.images.findMany({
        orderBy:{id:"desc"}
    })
    return NextResponse.json(images)
}

export const POST=async(req:NextRequest)=>{
    const {url,caption,img_name}=await req.json()
    const images=await prisma.images.create({
        data:{
            img_name: img_name,
            url:url,
            caption:caption
        }
    })
    return NextResponse.json({message:"Upload Success"})
}

export const DELETE=async(req:NextRequest)=>{
    const url=new URL(req.url).searchParams
    const id = Number(url.get('id'))
    const images=await prisma.images.delete({
        where:{
            id:id
        }
    })
    if(!images){
        return NextResponse.json({message:"Error"})
    }
    return NextResponse.json("Delete Succes")
}



export const PUT=async(req:NextRequest)=>{
    const {id,caption}=await req.json()
    console.log("id : ",id)
    const image=await prisma.images.update({
        where:{
            id:Number(id)
        },
        data:{
            caption:caption
        }
    })
    if(!image.id){
        return NextResponse.json({message:"error"},{status:404})
    }
    return NextResponse.json({
        message:"update success",
        data:{image}
    })
}