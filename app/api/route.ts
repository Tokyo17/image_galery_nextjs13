import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma=new PrismaClient()

export const GET =async(req:NextRequest)=>{
    const images=await prisma.images.findMany({})
    return NextResponse.json(images)
}