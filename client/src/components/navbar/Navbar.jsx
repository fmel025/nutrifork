import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="navbar bg-white z-50 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] font-Poppins">
            <div className="flex-1 px-5">
                <Link to={'/'}><img className="w-20" src="/src/assets/nutrifork-logo-cut.webp" /></Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal gap-4">
                    <li className="hidden md:block btn btn-sm h-10 border-0 text-sm md:text-base text-black font-normal rounded-md shadow-none hover:bg-accent-green hover:text-white"><a>Enlace</a></li>
                    <li className="hidden md:block btn btn-sm h-10 border-0 text-sm md:text-base text-black font-normal rounded-md shadow-none hover:bg-accent-green hover:text-white"><a>Enlace Dos</a></li>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-sm btn-circle h-10 w-10 hover:bg-gray-200 border-0 shadow-none">
                            <svg viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14 5C14 6.10457 13.1046 7 12 7C10.8954 7 10 6.10457 10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5Z" fill="#000000"></path> <path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" fill="#000000"></path> <path d="M12 21C13.1046 21 14 20.1046 14 19C14 17.8954 13.1046 17 12 17C10.8954 17 10 17.8954 10 19C10 20.1046 10.8954 21 12 21Z" fill="#000000"></path> </g></svg>
                        </div>
                        <ul tabIndex={0} className="menu dropdown-content p-2 my-6 gap-2 bg-white text-sm md:text-base text-black font-normal rounded-md w-52 shadow-[0_2px_10px_2px_rgb(0,0,0,0.05)]">
                            <li className="rounded-md hover:bg-accent-green hover:text-white"><a>Logueado</a></li>
                            <li className="rounded-md hover:bg-accent-green hover:text-white"><a>No logueado</a></li>
                            <li className="rounded-md hover:bg-accent-green hover:text-white"><a>Cerrar sesión</a></li>
                        </ul>
                    </div>
                </ul>
            </div>
        </div>
    )
}