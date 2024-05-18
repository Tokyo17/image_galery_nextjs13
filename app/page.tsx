"use client"

import { useEffect, useState } from 'react'
import Navbar from './nav';
import SkeletonImage from './component/skeletonImage'
import ImgContent from './component/imgContent';
import { split2, split3, split4,split5 } from './functionHandler';
// import { getImages } from './apiHandler';
import { useMyContext } from './MyContext';
import { gql, useQuery } from '@apollo/client';
// import { getPlaiceholder } from 'plaiceholder';


export default function Home() {

  const[showIndex,setShowIndex]=useState<number|null>(null)
  const [screenSize,setScreenSize]=useState([false,false,false,false])
  const [layar,setLayar]=useState(0)
  const [refresh,setRefresh]=useState(false)
  const [isLoading,setIsloading]=useState(true)
  const{imagesSplits,setImageSplits,json,setJson}=useMyContext();


  useEffect(()=>{
    if(json){
      if(window.innerWidth<=500){
        split2(setImageSplits,json)
      }else if(window.innerWidth>500&&window.innerWidth<=700){
        split3(setImageSplits,json)
      }else if(window.innerWidth>700&&window.innerWidth<=900){
        split4(setImageSplits,json)
      }else if(window.innerWidth>900){
        split5(setImageSplits,json)
      }
    }
  },[json])

  useEffect(()=>{
    console.log("get after del")
    // getImages(setIsloading,setJson)    
  },[refresh])

  useEffect(()=>{
    window.addEventListener("resize",screenHandler)
  
  })


  const GetData=gql`query MyQuery {
    galery(order_by: {id: desc}) {
      url
      id
    }
  }
  
  `
  useEffect(()=>{
    const widthScreen=window.innerWidth
    console.log(widthScreen)
        if(widthScreen<=500&&screenSize[0]==false){
          console.log("split2")
          split2(setImageSplits,json)
          let newScreenSize=[...screenSize]
          newScreenSize[0]=true
          newScreenSize[1]=false
          newScreenSize[2]=false
          newScreenSize[3]=false
          setScreenSize(newScreenSize)
        }else  if(widthScreen>500&&widthScreen<=700&&screenSize[1]==false){
          console.log("split3")
          split3(setImageSplits,json)
          let newScreenSize=[...screenSize]
          newScreenSize[0]=false
          newScreenSize[1]=true
          newScreenSize[2]=false
          newScreenSize[2]=false
          setScreenSize(newScreenSize)
        }else if(widthScreen>700&&widthScreen<=900&&screenSize[2]==false){
          console.log("sedang")
          split4(setImageSplits,json)
          let newScreenSize=[...screenSize]
          newScreenSize[0]=false
          newScreenSize[1]=false
          newScreenSize[2]=true
          newScreenSize[3]=false
          setScreenSize(newScreenSize)
        }else if(widthScreen>900&&screenSize[3]==false){
          console.log("besar")
          split5(setImageSplits,json)
          let newScreenSize=[...screenSize]
          newScreenSize[0]=false
          newScreenSize[1]=false
          newScreenSize[2]=false
          newScreenSize[3]=true
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

const { loading, error, data:dataAll } = useQuery(GetData,{

  onCompleted:()=>{
    setJson(dataAll.galery)
    console.log(dataAll)
},
  fetchPolicy: "network-only",   // Used for first execution
  nextFetchPolicy: "cache-and-network" // Doesn't check cache before making a network request
});


  return (
    <div>
        
        <div className="row">
          <ImgContent refresh={refresh} setRefresh={setRefresh} imagesSplits={imagesSplits} showIndex={showIndex} navImgHandler={navImgHandler}/> 
            {loading&& imagesSplits[0].length<1 ? <SkeletonImage/>:''}
        </div>
   </div>
  )
}
