"use client"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";



export default function ImgContent({cols,showIndex,navImgHandler}:any){
    const updRef = useRef<HTMLDivElement>(null);
    const delRef = useRef<HTMLDivElement>(null);
  

    
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (updRef.current?.isEqualNode(target)||delRef.current?.isEqualNode(target)) {
      console.log('klik didalam nav');
    } else if(updRef.current?.isEqualNode(target)==false||delRef.current?.isEqualNode(target)==false){
      console.log('keluar nav')
      navImgHandler(showIndex)
    }
  };

    return<>
        {cols.map((v:any, i:any) => {
          if(v.length>0){
            return (
              <div onMouseDown={handleMouseDown} key={i} className="colum">
                {v.map((v:any,i:any)=>{
                return<div   key={i}  className='img-content'>
                <Image  key={i} src={v.url} alt="gambar" width={500} height={300}/>
                <div className='img-information'>
                  <div className='img-caption'>{v.caption}</div>
                  <div className='img-nav'>
                    <div  onClick={()=>{navImgHandler(v.id)}} className='dot-nav' >...</div>
                    {showIndex===v.id && <div   className='img-nav-action'>                   
                       <p ref={updRef}>Update</p>
                       <p ref={delRef}>Delete</p>
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