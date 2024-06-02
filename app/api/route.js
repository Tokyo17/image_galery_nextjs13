import { PrismaClient } from "@prisma/client";
import {  NextResponse, } from "next/server";

const prisma=new PrismaClient()



export const GET =async(req)=>{
    const data=await prisma.galery.findMany({
        orderBy:{id:"desc"}
    })
    return NextResponse.json({data})
}

export const POST=async(req)=>{
    const {name,url,caption}=await req.json()
    console.log(name,url,caption)
    const data=await prisma.galery.create({
        data:{
            url:url,
            name:name,
            caption:caption
        }
    })
    return NextResponse.json({data})
}  

export const DELETE=async(req)=>{
    const url=new URL(req.url).searchParams
    const id = url.get('id')
    console.log(id, "id")
    const data=await prisma.galery.delete({
        where:{
            id:Number(id)
        }
    })
    return NextResponse.json({status:"dlete succes"})
}

export const PUT=async(req)=>{
    const {id,caption}=await req.json()
    await prisma.galery.update({
        where:{
            id:id
        },
        data:{
            caption:caption
        }
    })
    return NextResponse.json({status:"update success"})
}