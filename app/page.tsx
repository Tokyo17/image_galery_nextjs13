"use client"

import { useEffect, useState } from 'react'
import Navbar from './nav';
import SkeletonImage from './component/skeletonImage'
import ImgContent from './component/imgContent';
import { split3, split4,split5 } from './functionHandler';
import { getImages } from './apiHandler';
import { useMyContext } from './MyContext';


export default function Home() {

  const[showIndex,setShowIndex]=useState<number|null>(null)
  const [screenSize,setScreenSize]=useState([false,false,false])
  const [layar,setLayar]=useState(0)
  // const [json,setJson]=useState<any>()
  const [isLoading,setIsloading]=useState(true)
  
  const{imagesSplits,setImageSplits,json,setJson}=useMyContext();


  useEffect(()=>{
    if(json){
      if(window.innerWidth<=600){
        split3(setImageSplits,json)
      }else if(window.innerWidth>600&&window.innerWidth<=800){
        split4(setImageSplits,json)
      }else if(window.innerWidth>800){
        split5(setImageSplits,json)
      }
    }
  },[json])

  useEffect(()=>{
    getImages(setIsloading,setJson)    
  },[])

  useEffect(()=>{
    window.addEventListener("resize",screenHandler)
  
  })


  useEffect(()=>{
    console.log(layar)
    if(layar<=600&&layar!=0&&screenSize[0]==false&&json){
      split3(setImageSplits,json)
      let newScreenSize=[...screenSize]
      newScreenSize[0]=true
      newScreenSize[1]=false
      newScreenSize[2]=false
      setScreenSize(newScreenSize)
    }else if(layar>600&&layar<=800&&screenSize[1]==false&&json){
      console.log("sedang")
      split4(setImageSplits,json)
      let newScreenSize=[...screenSize]
      newScreenSize[0]=false
      newScreenSize[1]=true
      newScreenSize[2]=false
      setScreenSize(newScreenSize)
    }else if(layar>800&&screenSize[2]==false&&json){
      console.log("besar")
      split5(setImageSplits,json)
      let newScreenSize=[...screenSize]
      newScreenSize[0]=false
      newScreenSize[1]=false
      newScreenSize[2]=true
      setScreenSize(newScreenSize)
    }
  },[layar])

 
  const screenHandler=()=>{
    setLayar(window.innerWidth)
  }


const navImgHandler=(index:number)=>{
  console.log(index)
  setShowIndex(index === showIndex ? null : index);
}



  return (
    <div>
        <Navbar/>
        <div className="row">
          <ImgContent imagesSplits={imagesSplits} showIndex={showIndex} navImgHandler={navImgHandler}/> 
            {isLoading&& <SkeletonImage/>}
        </div>
   </div>
  )
}
