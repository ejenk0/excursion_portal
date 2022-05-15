import Image from "next/image";
import NavItem from "./NavItem";

export default function Navbar() {
    return (
        <div
            id="navbar"
            className="flex flex-row bg-cyan-600 w-full h-10 items-center"
        >
            <NavItem href="/dashboard">Dashboard</NavItem>
            <NavItem href="/nominees">Nominee Lookup</NavItem>
        </div>
    );
}
