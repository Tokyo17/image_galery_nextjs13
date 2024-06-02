import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "./firebase"
import { Dispatch, SetStateAction, useState } from "react"
import Swal from "sweetalert2"
import { useMyContext } from "./MyContext"




const showLoading=(title)=>{
  Swal.fire({
    title: title,
    html: 'please waiting for a seconds.',
    didOpen: () => {
        Swal.showLoading()
    },
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false
  })
}

const showError=()=>{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
  })
}

export const showSucces=(title)=>{
  Swal.fire({
    title:title,
    icon:'success',
    timer: 2000,
    showConfirmButton:false
  })
}


const useApi = () => {
  const{setJson,setIsOpen}=useMyContext();
  const[loadingApi,setLoading]=useState(false)

  const getDataApi=async()=>{
    console.log("data")
    try {
      setLoading(true);
      const response = await fetch("/api");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response?.json();
      setJson(data.data)
      console.log(data)
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false);
    }
  }
  const addImgApi=async(name,url,caption)=>{
    try {
        const response = await fetch("/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                url: url,
                caption: caption
            })
        });
        
        if (!response.ok) {
            throw new Error("Failed to add image");
        }

        const data = await response.json();
        console.log(data);
        getDataApi()
        showSucces("Upload success")
        setIsOpen(false)
    } catch (error) {
        console.error(error);
    }
  }

  const delImgApi=async(id)=>{
    try{
      const data= await fetch(`/api?id=${id}`,{
        method:"DELETE"
      })
      const json=await data.json()
      console.log(json,"success")
      showSucces("Delete success")
      }catch(err){
          console.log(err)
      }finally{
       
        getDataApi()
      }
  }


  const updateImgApi=async(id,caption,setIsOpen)=>{ 
    Swal.fire({
      title: 'Do you want to update?',
      showDenyButton: true,
      confirmButtonText: 'update',
      denyButtonText: `Cancle`,
    }).then(async(result) => {
      if (result.isConfirmed) {
        showLoading()
        await fetch(`/api`,{
          method:"PUT",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
              id:id,
              caption:caption
          })
      }).then(res=>{
          console.log(res)
          showSucces("Update success")
          getDataApi()
          setIsOpen(false)
      }).catch(err=>{
          console.log(err)
          showError()
      })
      }
    })  

}

  const deleteImg=(name,id)=>{

    Swal.fire({
      title: 'Do you want to delete?',
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancle`,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(name)
        showLoading("Process deleting data!")
        const filreRef=ref(storage,`files/${name}`)
        deleteObject(filreRef).then(()=>{
          console.log("del firebase success")
          delImgApi(id)
        }).catch((err)=>{
          console.log(err)
          showError()
        })
      }
    })
  
  }

  const uploadHandler=(imageFile,caption)=>{
    
    const randomNumber=Math.random().toFixed(4).slice(2)
    const generateImgName=`${imageFile?.name}${randomNumber}`


    if(imageFile){
          Swal.fire({
            title: 'Do you want to upload?',
            showCancelButton: true,
            confirmButtonText: 'Upload',
            denyButtonText: `Don't Upload`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

               showLoading('Process Uploading!')
                  if(imageFile){
                      const storageRef=ref(storage,`files/${generateImgName}`)
                      const uploadTask=uploadBytesResumable(storageRef,imageFile)
          
                      uploadTask.on("state_changed",
                      ()=>{
          
                      },(err)=>{
                          console.log(err)
                          showError()
                      },()=>{
                          getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
                            addImgApi(generateImgName,url,caption)  
                              
                              
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

  return {getDataApi,loadingApi,deleteImg,uploadHandler,updateImgApi };
};

export default useApi;

