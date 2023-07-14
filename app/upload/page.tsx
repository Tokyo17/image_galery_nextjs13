"use client"

import Image from "next/image"
import { ChangeEvent, useEffect, useState } from "react"
import img1 from "../asset/1.jpg"
import uploadIcon from "../asset/upload-solid.svg"

export default function upload(){

    const [selectedImage,setSelectedImage]=useState<string|null>(null)

    const selectedImageHandler=(event:ChangeEvent<HTMLInputElement>)=>{
        const target= event.target.files?.[0]
        if(target){
            const reader=new FileReader()
            reader.onload=()=>{
                setSelectedImage(reader.result as string)
            }
            reader.readAsDataURL(target);
        }
    }
    useEffect(()=>{
        console.log(selectedImage)
    },[selectedImage])

    return(
        <div className="form">
            <div className="preview">
               {selectedImage==null? <div className="before-select-img">Preview</div> :
                <Image src={selectedImage?selectedImage:''} alt='preview' width={200} height={100}/>}
            </div>
            <input id="inputGambar" type="file" accept="image/*" onChange={selectedImageHandler}/>
            <label htmlFor="inputGambar" className="my-2 bg-transparent hover:bg-sky-300 text-sky-500 font-semibold hover:text-white py-2 px-4 border border-sky-300 hover:border-transparent rounded">Choose File</label>
            <textarea placeholder="Write short caption..." className="border-2 p-4 border-gray-200  focus:outline-none focus:bg-white focus:border-sky-300"/>
            <button className="my-2 bg-transparent hover:bg-sky-300 text-sky-500 font-semibold hover:text-white py-2 px-4 border border-sky-300 hover:border-transparent rounded">
                {/* <Image src={uploadIcon} width={32} height={32} alt="upload icon"/> */}
                Button
            </button>
            <div>
                
            </div>
        </div>
    )
}