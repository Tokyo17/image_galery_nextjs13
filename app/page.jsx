"use client"

import { useEffect, useState } from 'react'
import SkeletonImage from './component/skeletonImage'
import ImgContent from './component/imgContent';
import { split2, split3, split4,split5 } from './helper/functionHandler';
import { useMyContext } from './MyContext';
import { Dialog, DialogPanel } from '@headlessui/react';
import Upload from './upload/page';
import useApi from './useApi';


export default function Home() {
  const [layar,setLayar]=useState(0)
  const [refresh,setRefresh]=useState(false)
  const{imagesSplits,setImageSplits,json,isOpen,setIsOpen}=useMyContext();
  const {getDataApi,loadingApi}=useApi()

   
  const screenHandler=()=>{
    setLayar(window.innerWidth)
  }

  
  useEffect(()=>{
    window.addEventListener("resize",screenHandler)
  })

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
  },[json,layar])

  useEffect(()=>{
    getDataApi()
  },[isOpen])
  







  return (
    <div>
     <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 ">
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 rounded ">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 rounded-md">
            <Upload/>
          </DialogPanel>
        </div>
        
      </Dialog>
        <div className="row">
          <ImgContent refresh={refresh} setRefresh={setRefresh} imagesSplits={imagesSplits}/> 
            {loadingApi&& imagesSplits[0].length<1 ? <SkeletonImage/>:''}
        </div>
   </div>
  )
}
