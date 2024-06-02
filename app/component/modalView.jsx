import { Dialog, DialogPanel } from "@headlessui/react"
import Image from "next/image"



const ModalView=({data,isOpen,setIsOpen})=>{

    const blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAABaCAQAAADTVfQ2AAAAD0lEQVR42mM8Vc84imAIAEBzdAVlXschAAAAAElFTkSuQmCC"

    return(
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 ">
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="dialog fixed inset-0 flex items-center justify-center p-4 rounded ">
          <DialogPanel className="dialog max-w-lg space-y-4 border bg-white p-12 rounded-md">
          <Image  blurDataURL={blur} placeholder="blur" src={data?.url} alt="gambar" width={300} height={400}/>
          </DialogPanel>
        </div>
        
      </Dialog>
    )
}

export default ModalView