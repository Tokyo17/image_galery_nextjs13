"use client"
import { deleteObject, ref } from "firebase/storage";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { storage } from "../firebase";
import { useRouter } from "next/navigation";
import useApi from "../useApi";
// import { deleteHandler } from "../apiHandler";



export default function ImgContent({imagesSplits,showIndex,navImgHandler}:any){
    const updRef = useRef<HTMLDivElement>(null);
    const delRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
  

    
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    // const target = event.target as HTMLElement;
    // // console.log(target)
    // // console.log(dotRef.current?.isEqualNode(target))

    // if (updRef.current?.isEqualNode(target)||delRef.current?.isEqualNode(target)) {
    // } else if(updRef.current?.isEqualNode(target)==false&&delRef.current?.isEqualNode(target)==false&&!dotRef.current?.isEqualNode(target)){
    //   navImgHandler(showIndex)
    // }
  };

//   const router=useRouter()

// const  updateHandler=(id:number)=>{
//     router.push(`/update/${id}`)
//   }
const {deleteImg}=useApi()
  const blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAABaCAQAAADTVfQ2AAAAD0lEQVR42mM8Vc84imAIAEBzdAVlXschAAAAAElFTkSuQmCC"

    return<>
        {imagesSplits.map((v:any, i:any) => {
          if(v.length>0){
            return (
              <div onMouseDown={handleMouseDown} key={i} className="colum">
                {v.map((v:any,i:any)=>{
                return<div   key={i}  className='img-content'>
                <Image placeholder="blur" blurDataURL={blur} key={i} src={v.url} alt="gambar" width={300} height={400}/>
                <div className='img-information'>
                  <div className='img-caption'>{v.caption}</div>
                  <div className='img-nav'>
                   {v.name!="Example"&&
                    <div  ref={dotRef} onMouseDown={()=>{deleteImg(v.name)}} className='dot-nav' >x</div>
                    }
                  </div>
                </div>
                </div> 
                })}
              </div>
            );
          }
        })}
    
    </>

}