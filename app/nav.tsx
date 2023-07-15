
import Link from "next/link";

export default function Navbar(){
    return<div className="navbar-menu">
        <h1><Link href="/">Moment Gallery</Link></h1>
        <div className="navbar-add-img"><Link href="/upload">+</Link></div>
    </div>
}