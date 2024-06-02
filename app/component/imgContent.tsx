"use client"
import Image from "next/image";
import { useState } from "react";
import useApi from "../useApi";
import ModalView from "./modalView";
import ModalUpdate from "./modalUpdate";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";



export default function ImgContent({imagesSplits,showIndex,navImgHandler}:any){

  

    
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
  };


const {deleteImg}=useApi()
  const blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAABaCAQAAADTVfQ2AAAAD0lEQVR42mM8Vc84imAIAEBzdAVlXschAAAAAElFTkSuQmCC"

  const[isOpen,setIsOpen]=useState(false)
  const[isOpenUpdate,setIsOpenUpdate]=useState(false)
  const[data,setData]=useState('')

    return<>
         <ModalView data={data} setIsOpen={setIsOpen} isOpen={isOpen}/>
         <ModalUpdate data={data} isOpen={isOpenUpdate} setIsOpen={setIsOpenUpdate}/>
        {imagesSplits.map((v:any, i:any) => {
          if(v.length>0){
            return (
              <div onMouseDown={handleMouseDown} key={i} className="colum">
             
                {v.map((v:any,i:any)=>{
                return<div   key={i}  className='img-content'>
                <Image onClick={()=>{
                  setData(v)
                  setIsOpen(true)
                  }} placeholder="blur" blurDataURL={blur} key={i} src={v.url} alt="gambar" width={300} height={400}/>
                <div className='img-information'>
                  <div className='img-caption'>{v.caption}</div>
                  <div className='img-nav'>
                   {v.name!="Example"&&
                    <div  
                    //  onMouseDown={()=>{deleteImg(v.name,v.id)}} 
                     className='dot-nav' >
                      
                      <Popover>
                          <PopoverButton className="text-sm/6 font-semibold  focus:outline-none   data-[focus]:outline-1 ">
                          ...
                          </PopoverButton>
                              <PopoverPanel
                              anchor="bottom end"
                              className="divide-y rounded-xl bg-white z-50 shadow-md text-sm/6 mt-2"
                              >
                              <div className="p-3 flex gap-2">
                                  <button onClick={()=>{             
                                      setData(v) 
                                      setIsOpenUpdate(true)
                                      }}
                                      className=" bg-blue-500  px-4 py-2 flex     rounded text-white " >
                                    Update
                                  </button>
                                  <button onClick={()=>{}} className=" bg-red-500  px-4 py-2 flex     rounded text-white " >
                                    Delete
                                  </button>
                              </div>
                              </PopoverPanel>
                      </Popover>
                      
                    </div>
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