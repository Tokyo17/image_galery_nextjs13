"use client"

import { ChangeEvent,useState } from "react"
import { uploadHandler } from "../useApi"
import { ApolloCache, DefaultContext, MutationFunctionOptions, OperationVariables, gql, useMutation } from "@apollo/client"

type UploadProps = {
  AddImg: (options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>> | undefined) => Promise<any>;
};

export default function Upload({ AddImg }: UploadProps){

    const [imageFile,setImageFile]=useState<any>(undefined)
    const [caption,setCaption]=useState<string>('')

    const selectedImageHandler=(event:ChangeEvent<HTMLInputElement>)=>{
        const file= event.target.files?.[0]
        setImageFile(file)
        if(file){
            const reader=new FileReader()
            reader.readAsDataURL(file);
        }
    }




    return(
        <div className="form">
            <div className="w-[250px] overflow-x-hidden text-ellipsis whitespace-nowrap text-center">{imageFile?.name}</div>
            <input id="inputGambar" type="file" accept="image/*" onChange={selectedImageHandler}/>
            <label htmlFor="inputGambar" className="my-2 bg-transparent hover:bg-sky-300 text-sky-500 font-semibold hover:text-white py-2 px-4 border border-sky-300 hover:border-transparent rounded">Choose File</label>
            <textarea maxLength={70} onChange={(e)=>{setCaption(e.target.value)}} placeholder="Write short caption..." className="border-2 p-4 border-gray-200  focus:outline-none focus:bg-white focus:border-sky-300"/>
            <button onClick={()=>{
                uploadHandler(imageFile,caption,AddImg)
                }} className="my-2 bg-transparent hover:bg-sky-300 text-sky-500 font-semibold hover:text-white py-2 px-4 border border-sky-300 hover:border-transparent rounded">
                Button
            </button>
            <div>
                
            </div>
        </div>
    )
}
