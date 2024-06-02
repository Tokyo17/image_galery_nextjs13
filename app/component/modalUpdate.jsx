import { Dialog, DialogPanel } from "@headlessui/react"
import useApi from "../useApi"
import { useEffect, useState } from "react"



const ModalUpdate=({data,isOpen,setIsOpen})=>{

    const[caption,setCaption]=useState(data.caption)
    useEffect(()=>{
        setCaption(data.caption)
    },[isOpen])
    const {updateImgApi}=useApi()
    return(
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 ">
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
            <div className=" fixed inset-0 flex items-center justify-center p-4 rounded ">
                <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 rounded-md">
                <div className="form">
                        <textarea
                            maxLength={70}
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Write short caption..."
                            className="border-2 p-4 border-gray-200 rounded focus:outline-none focus:bg-white focus:border-blue-500 "
                         />
                          <button
                            onClick={() => {
                                updateImgApi(data.id,caption,setIsOpen)
                            }}
                            className="mt-5 bg-blue-500  px-4 py-2 flex   rounded text-white " 
                                >
                            Update
                          </button>
                </div> 
                </DialogPanel>
            </div>
       </Dialog>
    )
}

export default ModalUpdate