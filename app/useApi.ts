import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "./firebase"
import { Dispatch, SetStateAction } from "react"
import Swal from "sweetalert2"
import { gql, useLazyQuery, useMutation } from "@apollo/client"
import { useMyContext } from "./MyContext"




const showLoading=(title:string)=>{
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

export const showSucces=(title:string)=>{
  Swal.fire({
    title:title,
    icon:'success',
    timer: 2000,
    showConfirmButton:false
  })
}

const GetData=gql`query MyQuery {
  galery(order_by: {id: desc}) {
    url
    id
    caption
    name
  }
}
`
const addImg=gql`mutation MyMutation($caption: String = "", $name: String = "", $url: String = "") {
  insert_galery(objects: {caption: $caption, name: $name, url: $url}) {
    returning {
      caption
      id
      name
      url
    }
  }
}
`

const delImg=gql`mutation MyMutation($_eq: String = "") {
  delete_galery(where: {name: {_eq: $_eq}}) {
    returning {
      name
    }
  }
}
`


const useApi = () => {
  const{setJson,setIsOpen}=useMyContext();
 const[getData, { loading, error, data:dataAll }] = useLazyQuery(GetData,{
  
    onCompleted:()=>{
      setJson(dataAll.galery)
      console.log(dataAll)
  },
    fetchPolicy: "network-only",   // Used for first execution
    nextFetchPolicy: "cache-and-network" // Doesn't check cache before making a network request
  });
  
  const [AddImg, { data, loading:tunggu, error:errorAdd }] = useMutation(addImg,{
    onCompleted:()=>{
        showSucces("Upload success")
        console.log(data)
        getData()
        setIsOpen(false)
    }
  });

  const [DelImg, { data:dataDel, loading:loadDel, error:errorDel }] = useMutation(delImg,{
    onCompleted:()=>{
        console.log(data)
        
        showSucces("Delete success")
        getData()
    }
  });
  const deleteImg=(name:string)=>{

    Swal.fire({
      title: 'Do you want to upload?',
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancle`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        console.log(name)
        showLoading("Process deleting data!")
        const filreRef=ref(storage,`files/${name}`)
        deleteObject(filreRef).then(()=>{
          console.log("del firebase success")
          DelImg({
            variables:{
              _eq: name
            }
          })
          
        }).catch((err)=>{
          console.log(err)
          showError()
        })
      }
    })
  
  }

  return { getData,loading,AddImg,deleteImg };
};

export default useApi;


// export const getImages=async(setIsloading:any,setJson:any)=>{
//     // setIsloading(true)
//     // try{
//     //   const res=await fetch("/api",{cache:"no-store"})
//     //   const json=await res.json()
//     //   if(json){
//     //     // console.log(json)
//     //     setJson(json)
//     //   }
//     // }catch(err){
//     //   console.log(err)
//     // }finally{
//     //   setIsloading(false)
//     // }
//   }

//   // ================================DELETE==============================



//   export const deleteHandler=async (id:any,name:string,setRefresh:Dispatch<SetStateAction<boolean>>,refresh:boolean)=>{

//     Swal.fire({
//       title: 'Do you want to delete?',
//       showDenyButton: true,
//       // showCancelButton: true,
//       confirmButtonText: 'Delete',
//       denyButtonText: `Don't Delete`,
//     }).then( async (result) => {
//       /* Read more about isConfirmed, isDenied below */
//       if (result.isConfirmed) {

//         showLoading("Process deleting data!")

//         await fetch("api?id="+id,{
//           method:"DELETE"
//         }).then(()=>{
//           console.log("del prisma success")
//           deleteFirebase(name,setRefresh,refresh)
//         }).catch(err=>{
//           console.log(err)
//           showError()
//         })
//       } else if (result.isDenied) {
//         // Swal.fire('Changes are not saved', '', 'info')
//       }
//     })

//   }



//   // =====================UPLOAD==========================
  

//     const uploadPrismaHandler=async(url:any,img_name:any,caption:string,router:any)=>{

//         await fetch("api",{
//             method:"POST",
//             headers:{
//                 "Content-Type":"application/json"
//             },
//             body:JSON.stringify({
//                 img_name:img_name,
//                 url:url,
//                 caption:caption,
//             })
//         }).then(res=>{
//             console.log(res)
//             showSucces("Upload success")
//             router.push("/")
//         }).catch(err=>{
//             console.log(err)
//             showError()
//         })
        
//     }

    
export   const uploadHandler=(imageFile:any,caption:string,AddImg:any)=>{
    
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
                                
                                  AddImg({
                                    variables:{
                                        caption:caption,
                                        url:url,
                                        name:generateImgName
                                    }
                                  })                     
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



//     // =============================== UPDATE =====================================


//     export const updateData=async(id:any,caption:any,router:any)=>{
//       // showLoading("Process updating data!")
    
//       Swal.fire({
//         title: 'Do you want to update?',
//         showDenyButton: true,
//         showCancelButton: true,
//         confirmButtonText: 'Update',
//         denyButtonText: `Don't update`,
//       }).then(async(result) => {
//         /* Read more about isConfirmed, isDenied below */
//         if (result.isConfirmed) {

//            showLoading('Process Updating!')
           
//           await fetch("/api",{
//             method:"PUT",
//             headers:{
//                 "Content-Type":"application/json"
//             },
//             body:JSON.stringify({
//                 id:id,
//                 caption:caption
//             })
//         }).then((res)=>{
//             if(res.status==200){
//                Swal.fire({
//                 title:'Success!',
//                 icon:'success',
//                 timer: 1000,
//                 showConfirmButton:false
//               })
//                 router.push("/")
//             }else{
//               showError()
//             }
//         }).catch((err)=>{
//             console.log(err)
//             showError()
//         })

//         } else if (result.isDenied) {
//           // Swal.fire('Changes are not saved', '', 'info')
//         }
//       })

//   }
//   export const getData=async(id:any,setImagePreview:any,setCaption:any)=>{

//     showLoading("Process get data!")
//       console.log(id)
//       try{
//           const res=await fetch("/api/"+id)
//           const json=await res.json()
//           setImagePreview(json.url||'')
//           setCaption(json.caption||'')
//           if(json){
//             showSucces("Getdata success")
//           }
//       }catch(err){
//           console.log(err)
//           showError()
//           //   router.push("/")
//       }
//   }
