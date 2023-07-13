"use client"

import { useEffect, useState } from 'react'
import Navbar from './nav';
import SkeletonImage from './component/skeletonImage'
import ImgContent from './component/imgContent';
import { split3, split4 } from './functionHandler';
import { getImages } from './apiHandler';
import { useMyContext } from './MyContext';


export default function Home() {

  const[showIndex,setShowIndex]=useState<number|null>(null)
  const [cols, setCols] = useState<any[][]>([[], [], [], []]);
  const [screenSize,setScreenSize]=useState([false,false])
  const [layar,setLayar]=useState(0)
  const [json,setJson]=useState<any>()
  const [isLoading,setIsloading]=useState(true)
  
  const{message,setMessage}=useMyContext();



  useEffect(()=>{
    console.log(cols)
  },[cols])

  useEffect(()=>{
    if(window.innerWidth<=600){
      split3(setCols,message)
    }else if(window.innerHeight>600){
      split4(setCols,message)
    }
  },[message])

  useEffect(()=>{
    getImages(setIsloading,setMessage)    
  },[])

  useEffect(()=>{
    window.addEventListener("resize",screenHandler)
  
  })


  useEffect(()=>{
    if(layar<=600&&layar!=0&&screenSize[0]==false){
      split3(setCols,message)
      let newScreenSize=[...screenSize]
      newScreenSize[0]=true
      newScreenSize[1]=false
      setScreenSize(newScreenSize)
    }else if(layar>600&&screenSize[1]==false){
      split4(setCols,message)
      let newScreenSize=[...screenSize]
      newScreenSize[0]=false
      newScreenSize[1]=true
      setScreenSize(newScreenSize)
    }
  },[layar])

 
  const screenHandler=()=>{
    setLayar(window.innerWidth)
  }


const navImgHandler=(index:number)=>{
  setShowIndex(index === showIndex ? null : index);
}



  return (
    <div>
        <Navbar/>
        {/* {message}
        <button onClick={()=>{setMessage("hayhay")}}>change message</button> */}
        <div className="row">
          <ImgContent cols={cols} showIndex={showIndex} navImgHandler={navImgHandler}/> 
            {isLoading&& <SkeletonImage/>}
        </div>
   </div>
  )
}
