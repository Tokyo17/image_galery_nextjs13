"use client"

import Image from "next/image"
import { ChangeEvent, SetStateAction, useEffect, useState } from "react"
import img1 from "../asset/1.jpg"
import uploadIcon from "../asset/upload-solid.svg"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "../firebase"
import { useRouter } from "next/navigation"

export default function upload(){

    const [selectedImagePreview,setSelectedImagePreview]=useState<string|null>(null)
    const [imageFile,setImageFile]=useState<any>(undefined)
    const [caption,setCaption]=useState<string>('')

    const router=useRouter()

    const uploadPrismaHandler=async(url:any,img_name:any)=>{
        console.log(img_name,url,caption)
        await fetch("api",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                img_name:img_name,
                url:url,
                caption:caption,
            })
        }).then(res=>{
            console.log(res)
            router.push("/")
        }).catch(err=>{
            console.log(err)
        })
        
    }

    
    const uploadHandler=()=>{
        
        if(imageFile){
             const storageRef=ref(storage,`files/${imageFile?.name}`)
            const uploadTask=uploadBytesResumable(storageRef,imageFile)

            uploadTask.on("state_changed",
            (snapshot)=>{

            },(err)=>{
                console.log(err)
            },()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
                    uploadPrismaHandler(url,imageFile?.name)
                    console.log(url)
                })
            }
            )
        }
    }

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
        console.log(selectedImagePreview)
    },[selectedImagePreview])

    return(
        <div className="form">
            <div className="preview">
               {selectedImagePreview==null? <div className="before-select-img">Preview</div> :
                <Image src={selectedImagePreview?selectedImagePreview:''} alt='preview' width={200} height={100}/>}
            </div>
            <input id="inputGambar" type="file" accept="image/*" onChange={selectedImageHandler}/>
            <label htmlFor="inputGambar" className="my-2 bg-transparent hover:bg-sky-300 text-sky-500 font-semibold hover:text-white py-2 px-4 border border-sky-300 hover:border-transparent rounded">Choose File</label>
            <textarea onChange={(e)=>{setCaption(e.target.value)}} placeholder="Write short caption..." className="border-2 p-4 border-gray-200  focus:outline-none focus:bg-white focus:border-sky-300"/>
            <button onClick={uploadHandler} className="my-2 bg-transparent hover:bg-sky-300 text-sky-500 font-semibold hover:text-white py-2 px-4 border border-sky-300 hover:border-transparent rounded">
                {/* <Image src={uploadIcon} width={32} height={32} alt="upload icon"/> */}
                Button
            </button>
            <div>
                
            </div>
        </div>
    )
}