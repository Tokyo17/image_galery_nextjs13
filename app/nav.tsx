"use client"
import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Link from "next/link";
import { useState } from "react";
import Upload from "./upload/page";
import { useMyContext } from "./MyContext";

export default function Navbar(){

const {setIsOpen}=useMyContext()
    return<div className="navbar-menu">

        <h1><Link href="/">Moment Gallery</Link></h1>
        <div className="navbar-add-img" onClick={()=>setIsOpen(true)}>
            {/* <Link href="/upload">+</Link> */}
            +
        </div>
    </div>
}