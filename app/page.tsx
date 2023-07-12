"use client"
import Image from 'next/image'




import { Suspense, useEffect, useState } from 'react'
import Navbar from './nav';
import SkeletonImage from './component/skeletonImage'


export default function Home() {


  const [cols, setCols] = useState<any[][]>([[], [], [], []]);
  const [sedang,setSedang]=useState(false)
  const [besar,setBesar]=useState(false)
  const [layar,setLayar]=useState(0)
  const [json,setJson]=useState<any>()
  const [fecthing,setFecthing]=useState(true)
  

  const getImages=async()=>{
    setFecthing(true)
    console.log("Gest")
    try{
      const res=await fetch("/api")
      const json=await res.json()
      setJson(json)
      // split(json)
      // console.log(json)
    }catch{

    }finally{
      setFecthing(false)
    }
  }

  const split = () => {
    setCols((prevCols) => {
      const newCols:number[][] = [[], [], [], []];
      json?.map((v:any,i:any)=>{
      if((i+1)%4==1){
        newCols[0].push(v)
      }else if((i+1)%4==2){
        newCols[1].push(v)
      }else if((i+1)%4==3){
        newCols[2].push(v)
      }else if((i+1)%4==0){
        newCols[3].push(v)
      }
    })
    // console.log(newCols)
      return newCols; // Mengembalikan array kolom yang diperbarui
    });
  };

  const split2 = () => {
    setCols((prevCols) => {
      const newCols:number[][] = [[], [], [], []];
      json?.map((v:any,i:any)=>{
      if((i+1)%3==1){
        newCols[0].push(v)
      }else if((i+1)%3==2){
        newCols[1].push(v)
      }else if((i+1)%3==0){
        newCols[2].push(v)
      }
    })
      return newCols; // Mengembalikan array kolom yang diperbarui
    });
  };

  useEffect(()=>{
    // console.log(cols[0]?.[0]?.url)
  },[cols])

  useEffect(()=>{
    if(window.innerWidth<=600){
      split2()
    }else if(window.innerHeight>600){
      split()
    }
  },[json])

  useEffect(()=>{
    getImages()    
  },[])

  useEffect(()=>{
    if(layar<=600&&layar!=0&&sedang==false){
      split2()
      setBesar(false)
      setSedang(true)
    }else if(layar>600&&besar==false){
      split()
      setBesar(true)
      setSedang(false)
    }
  },[layar])

 
  const screenHandler=()=>{
    setLayar(window.innerWidth)
  }

  useEffect(()=>{
    window.addEventListener("resize",screenHandler)
  
  })

const[showIndex,setShowIndex]=useState<number|null>(null)

const navImgHandler=(index:number)=>{
  setShowIndex(index === showIndex ? null : index);
}

  return (
    <div>
  <Navbar/>


    <div className="row">

    {/* <SkeletonImage width={layar}/> */}
    {fecthing? <SkeletonImage width={layar}/> :
        cols.map((v, i) => {
          if(v.length>0){
            return (
              <div key={i} className="colum">
                {v.map((v:any,i)=>{
                  // console.log(v)
                return<div key={i} className='img-content'>
                  <div className='img-nav'>
                    <div onClick={()=>{navImgHandler(v.id)}} className='dot-nav'>...</div>
                    {showIndex===v.id && <div className='img-nav-action'>                   
                       <p>Update</p>
                       <p>Delete</p>
                    </div>}
                  </div>
                <Image key={i} src={v.url} alt="gambar" width={500} height={300}/>
                <div className='img-information'>
                  <div className='img-caption'>{v.caption}</div>
                </div>
                </div> 
                })}
              </div>
            );
          }
        })
     }
    </div>
   
   </div>
  )
}
