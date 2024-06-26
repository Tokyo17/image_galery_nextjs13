"use client"


export default function SkeletonImage({width}){

    function Skeleton(height){
        return <div className="skeleton-content">
                    <div className={`flex ${height} skeleton-img max-w-full items-center justify-center h-48 bg-gray-300  w-96 `}>
                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                        </svg>
                    </div>
                    <div className="skeleton-caption max-w-full h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 "></div>
                </div>
      }
    function  skeleton(){
        return(
            <>
                <div role="status" className="colum skeleton  animate-pulse ">
                    {Skeleton("h-70s")}
                        {Skeleton("h-48")}
                        {Skeleton("h-80")}
                </div>    
                <div role="status" className="colum skeleton  animate-pulse ">
                        {Skeleton("h-60")}
                            {Skeleton("h-56")}
                            {Skeleton("h-44")}
                 </div>  
                <div role="status" className="colum skeleton  animate-pulse ">
                        {Skeleton("h-44")}
                            {Skeleton("h-56")}
                            {Skeleton("h-52")}
                </div>        
                <div role="status" className="colum skeleton  animate-pulse ">
                    {Skeleton("h-60")}
                        {Skeleton("h-72")}
                        {Skeleton("h-72")}
                </div>
                <div role="status" className="colum skeleton  animate-pulse ">
                    {Skeleton("h-60")}
                        {Skeleton("h-80")}
                        {Skeleton("h-72")}
                </div>
         </>
        
        )
    } 
   
    return(
        <>
        {skeleton()}
        </>
    )
}