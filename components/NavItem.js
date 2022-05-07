import Link from "next/link";

export default function NavItem({ href, children }) {
    return (
        <div className="h-full items-center hover:bg-slate-400 grow">
            <Link href={href}>
                <a className="h-full flex items-center w-full justify-center">
                    <div>{children}</div>
                </a>
            </Link>
        </div>
    );
}
