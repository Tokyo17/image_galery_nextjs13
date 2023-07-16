import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "./firebase"
import { Dispatch, SetStateAction } from "react"
import Swal from "sweetalert2"




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


  // ================================DELETE==============================

  const deleteFirebase=(name:any,setRefresh:Dispatch<SetStateAction<boolean>>,refresh:boolean)=>{
    const filreRef=ref(storage,`files/${name}`)
    deleteObject(filreRef).then(()=>{
      Swal.fire({
        title:'Delete Success!',
        icon:'success',
        timer: 2000,
        showConfirmButton:false
      })
      console.log("del firebase success")
      setRefresh(!refresh)
    }).catch((err)=>{
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    })
  }

  export const deleteHandler=async (id:any,name:string,setRefresh:Dispatch<SetStateAction<boolean>>,refresh:boolean)=>{

    Swal.fire({
      title: 'Do you want to delete?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then( async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

          Swal.fire({
            title: 'Process Deleting!',
            html: 'please waiting for a seconds.',
            didOpen: () => {
                Swal.showLoading()
            },
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false
          })

        await fetch("api?id="+id,{
          method:"DELETE"
        }).then(()=>{
          console.log("del prisma success")
          deleteFirebase(name,setRefresh,refresh)
        }).catch(err=>{
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        })
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })

  }



  // =====================UPLOAD==========================
  

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
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
        })
        
    }

    
export   const uploadHandler=(imageFile:any,caption:string,router:any)=>{
        const randomNumber=Math.random().toFixed(4).slice(2)
        const generateImgName=`${imageFile?.name}${randomNumber}`

        if(imageFile){
              Swal.fire({
                title: 'Do you want to upload?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Upload',
                denyButtonText: `Don't Upload`,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
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
                              Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Something went wrong!',
                              })
                          },()=>{
                              getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
                                  uploadPrismaHandler(url,generateImgName,caption,router)                      
                              })
                          }
                          )
                      }
                } else if (result.isDenied) {
                  // Swal.fire('Changes are not saved', '', 'info')
                }
              })
        }else{
          Swal.fire({
            icon: 'info',
            title: 'Info',
            text: 'Please input your image',
          })
        }

    }