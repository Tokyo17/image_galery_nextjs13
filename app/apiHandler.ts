import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { useMyContext } from "./MyContext"
import { storage } from "./firebase"
import { Dispatch, SetStateAction } from "react"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { title } from "process"
import { Html } from "next/document"




export const getImages=async(setIsloading:any,setJson:any)=>{
    setIsloading(true)
    try{
      const res=await fetch("/api",{cache:"no-store"})
      const json=await res.json()
      if(json){
        // console.log(json)
        setJson(json)
      }
    }catch(err){
      console.log(err)
    }finally{
      setIsloading(false)
    }
  }


  const deleteFirebase=(name:any,setRefresh:Dispatch<SetStateAction<boolean>>,refresh:boolean)=>{
    const filreRef=ref(storage,`files/${name}`)
    deleteObject(filreRef).then(()=>{
      console.log("del firebase success")
      setRefresh(!refresh)
    }).catch((err)=>{
      console.log(err)
    })
  }

  export const deleteHandler=async (id:any,name:string,setRefresh:Dispatch<SetStateAction<boolean>>,refresh:boolean)=>{
    await fetch("api?id="+id,{
      method:"DELETE"
    }).then(()=>{
      console.log("del prisma success")
      deleteFirebase(name,setRefresh,refresh)
    }).catch(err=>{
      console.log(err)
    })

  }



  

    const uploadPrismaHandler=async(url:any,img_name:any,caption:string,router:any)=>{
      
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
            Swal.fire({
              title:'Upload Success!',
              icon:'success',
              timer: 2000,
              showConfirmButton:false
            })
            router.push("/")
        }).catch(err=>{
            console.log(err)
        })
        
    }

    
export   const uploadHandler=(imageFile:any,caption:string,router:any)=>{
        const randomNumber=Math.random().toFixed(4).slice(2)
        const generateImgName=`${imageFile?.name}${randomNumber}`
        Swal.fire({
          title: 'Process Uploading!',
          html: 'please waiting for a seconds.',
          didOpen: () => {
              Swal.showLoading()
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
          })
        if(imageFile){
             const storageRef=ref(storage,`files/${generateImgName}`)
            const uploadTask=uploadBytesResumable(storageRef,imageFile)

            uploadTask.on("state_changed",
            ()=>{

            },(err)=>{
                console.log(err)
            },()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
                    uploadPrismaHandler(url,generateImgName,caption,router)
                    // console.log(url)
                })
            }
            )
        }
    }