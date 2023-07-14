"use client"
import { deleteObject, ref } from "firebase/storage";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { storage } from "../firebase";
import { useRouter } from "next/navigation";



export default function ImgContent({imagesSplits,showIndex,navImgHandler,setRefresh,refresh}:any){
    const updRef = useRef<HTMLDivElement>(null);
    const delRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
  

    
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (updRef.current?.isEqualNode(target)||delRef.current?.isEqualNode(target)) {
      console.log('klik didalam nav');
    } else if(updRef.current?.isEqualNode(target)==false&&delRef.current?.isEqualNode(target)==false&&dotRef.current?.isEqualNode(target)==false){
      console.log('keluar nav2')
      navImgHandler(showIndex)
    }
  };

  const router=useRouter()

  const deleteFirebase=(name:any)=>{
    const filreRef=ref(storage,`files/${name}`)
    deleteObject(filreRef).then(()=>{
      console.log("del firebase success")
      setRefresh(!refresh)
      router.refresh()
    }).catch((err)=>{
      console.log(err)
    })
  }

  const deleteHandler=async (id:any,name:any)=>{
    await fetch("api?id="+id,{
      method:"DELETE"
    }).then(()=>{
      console.log("del prisma success")
      deleteFirebase(name)
    }).catch(err=>{
      console.log(err)
    })

  }

    return<>
        {imagesSplits.map((v:any, i:any) => {
          if(v.length>0){
            return (
              <div onMouseDown={handleMouseDown} key={i} className="colum">
                {v.map((v:any,i:any)=>{
                return<div   key={i}  className='img-content'>
                <Image  key={i} src={v.url} alt="gambar" width={500} height={300}/>
                <div className='img-information'>
                  <div className='img-caption'>{v.caption}</div>
                  <div className='img-nav'>
                    <div  ref={dotRef} onMouseDown={()=>{navImgHandler(v.id)}} className='dot-nav' >...</div>
                    {showIndex===v.id && <div   className='img-nav-action'>                   
                       <p ref={updRef}>Update</p>
                       <p onClick={()=>{deleteHandler(v.id,v.img_name)}} ref={delRef}>Delete</p>
                    </div>}
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