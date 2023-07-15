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
  const [refresh,setRefresh]=useState(false)
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
    console.log("get after del")
    getImages(setIsloading,setJson)    
  },[refresh])

  useEffect(()=>{
    window.addEventListener("resize",screenHandler)
  
  })


  useEffect(()=>{
    console.log(layar)
    if(layar<=600&&layar!=0&&screenSize[0]==false){
      split3(setImageSplits,json)
      let newScreenSize=[...screenSize]
      newScreenSize[0]=true
      newScreenSize[1]=false
      newScreenSize[2]=false
      setScreenSize(newScreenSize)
    }else if(layar>600&&layar<=800&&screenSize[1]==false){
      console.log("sedang")
      split4(setImageSplits,json)
      let newScreenSize=[...screenSize]
      newScreenSize[0]=false
      newScreenSize[1]=true
      newScreenSize[2]=false
      setScreenSize(newScreenSize)
    }else if(layar>800&&screenSize[2]==false){
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


const navImgHandler=(index:number|null)=>{
  console.log(index)
  setShowIndex(index === showIndex  ? null : index);
}



  return (
    <div>
        
        <div className="row">
          <ImgContent refresh={refresh} setRefresh={setRefresh} imagesSplits={imagesSplits} showIndex={showIndex} navImgHandler={navImgHandler}/> 
            {isLoading&& <SkeletonImage/>}
        </div>
   </div>
  )
}
