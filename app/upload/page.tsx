"use client"

import Image from "next/image"
import { ChangeEvent, SetStateAction, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { uploadHandler } from "../apiHandler"
import Swal from "sweetalert2"

export default function upload(){

    const [selectedImagePreview,setSelectedImagePreview]=useState<string|null>(null)
    const [imageFile,setImageFile]=useState<any>(undefined)
    const [caption,setCaption]=useState<string>('')
    const [isLoading,setIsloading]=useState<boolean>(false)

    const router=useRouter()

    const selectedImageHandler=(event:ChangeEvent<HTMLInputElement>)=>{
        const file= event.target.files?.[0]
        setImageFile(file)
        if(file){
            const reader=new FileReader()
            reader.onload=()=>{
                setSelectedImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file);
        }
    }
    useEffect(()=>{
        // console.log(selectedImagePreview)
    },[selectedImagePreview])


    return(
        <div className="form">
            <div className="preview">
               {selectedImagePreview==null? <div className="before-select-img">Image Preview</div> :
                <Image src={selectedImagePreview?selectedImagePreview:''} alt='preview' width={200} height={100}/>}
            </div>
            <input id="inputGambar" type="file" accept="image/*" onChange={selectedImageHandler}/>
            <label htmlFor="inputGambar" className="my-2 bg-transparent hover:bg-sky-300 text-sky-500 font-semibold hover:text-white py-2 px-4 border border-sky-300 hover:border-transparent rounded">Choose File</label>
            <textarea onChange={(e)=>{setCaption(e.target.value)}} placeholder="Write short caption..." className="border-2 p-4 border-gray-200  focus:outline-none focus:bg-white focus:border-sky-300"/>
            <button onClick={()=>{uploadHandler(imageFile,caption,router)}} className="my-2 bg-transparent hover:bg-sky-300 text-sky-500 font-semibold hover:text-white py-2 px-4 border border-sky-300 hover:border-transparent rounded">
                Button
            </button>
            <div>
                
            </div>
        </div>
    )
}