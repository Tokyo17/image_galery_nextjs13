"use client"

import Image from "next/image"
import { ChangeEvent, SetStateAction, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { getData, updateData } from "@/app/apiHandler"


export default function Update({params}:{params:{id:string}}){

    const [imagePreview,setImagePreview]=useState<string|null>(null)
    
    const [caption,setCaption]=useState<string>('')

    const router=useRouter()
    const id=params.id



    useEffect(()=>{
        console.log(imagePreview)
    },[imagePreview])

    useEffect(()=>{
        Swal.fire({
            title: 'Process get data!',
            html: 'please waiting for a seconds.',
            didOpen: () => {
                Swal.showLoading()
                getData(id,setImagePreview,setCaption)
            },
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false
          })
    },[])

    return(
        <div className="form">
            <div className="preview">
               {imagePreview==null? 
               <div role="status" className="skeleton  animate-pulse ">
                    <div className={`flex h-72 skeleton-img max-w-full items-center justify-center h-48 bg-gray-300  w-96 `}>
                       <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                       <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                       </svg>
                   </div>
                </div>
                : 
                <Image src={imagePreview?imagePreview:''} alt='preview' width={200} height={100}/>} 
            </div>
            <textarea maxLength={70} disabled={imagePreview?false:true} style={imagePreview?{}:{cursor:"not-allowed"}} value={caption} onChange={(e)=>{setCaption(e.target.value)}} placeholder="Write short caption..." className="border-2 p-4 border-gray-200  focus:outline-none focus:bg-white focus:border-sky-300 my-2"/>
            <button disabled={imagePreview?false:true} style={imagePreview?{}:{cursor:"not-allowed"}}  onClick={()=>{updateData(id,caption,router)}} className=" bg-transparent hover:bg-sky-300 text-sky-500 font-semibold hover:text-white py-2 px-4 border border-sky-300 hover:border-transparent rounded">
                Button
            </button>
            <div>
                
            </div>
        </div>
    )
}