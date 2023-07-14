import { useMyContext } from "./MyContext"




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
