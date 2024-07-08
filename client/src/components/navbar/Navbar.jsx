import { Link } from "react-router-dom";
import AuthContext from "../utils/AuthContext";
import { useContext } from "react";

export default function Navbar() {
    const { loggedIn, logout } = useContext(AuthContext);

    return (
        <div className="navbar bg-white z-50 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] font-Poppins">
            <div className="flex-1 px-5">
                <Link to={'/'}><img className="w-20" src="nutrifork-logo-cut.webp" alt="logo" /></Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal gap-4">
                    <Link to={'/'}><li className="hidden md:block btn btn-sm h-10 border-0 text-sm md:text-base text-black font-normal rounded-md shadow-none hover:bg-accent-green hover:text-white"><a>Recetas</a></li></Link>

                    {loggedIn ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-sm btn-circle h-10 w-10 hover:bg-gray-200 border-0 shadow-none">
                                <svg viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14 5C14 6.10457 13.1046 7 12 7C10.8954 7 10 6.10457 10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5Z" fill="#000000"></path> <path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" fill="#000000"></path> <path d="M12 21C13.1046 21 14 20.1046 14 19C14 17.8954 13.1046 17 12 17C10.8954 17 10 17.8954 10 19C10 20.1046 10.8954 21 12 21Z" fill="#000000"></path> </g></svg>
                            </div>
                            <ul tabIndex={0} className="menu dropdown-content p-2 my-6 gap-2 border-2 border-dark-green bg-white text-sm md:text-base text-black font-normal rounded-md w-52 shadow-[0_2px_10px_2px_rgb(0,0,0,0.05)]">
                                <Link to={'/perfil'}><li className="rounded-md hover:bg-accent-green hover:text-white"><a>Perfil</a></li></Link>
                                <Link to={'/ajustes'}><li className="rounded-md hover:bg-accent-green hover:text-white"><a>Ajustes</a></li></Link>
                                <li className="rounded-md hover:bg-accent-green hover:text-white" onClick={logout}><a>Cerrar sesión</a></li>
                            </ul>
                        </div>
                    ) : (
                        <div>
                            <Link to={'/iniciar-sesion'}><li className="hidden md:block btn btn-sm h-10 border-0 text-sm md:text-base text-white font-normal rounded-md shadow-none bg-dark-green hover:bg-accent-green"><a>Inicia sesión</a></li></Link>
                            <Link to={'/iniciar-sesion'}>
                                <li className="md:hidden btn btn-sm h-10 border-0 text-sm md:text-base text-white font-normal rounded-md shadow-none bg-dark-green hover:bg-accent-green">
                                    <svg className="w-fit h-fit" width="70px" height="70px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M8 6C8 3.79086 9.79086 2 12 2H17.5C19.9853 2 22 4.01472 22 6.5V17.5C22 19.9853 19.9853 22 17.5 22H12C9.79086 22 8 20.2091 8 18V17C8 16.4477 8.44772 16 9 16C9.55228 16 10 16.4477 10 17V18C10 19.1046 10.8954 20 12 20H17.5C18.8807 20 20 18.8807 20 17.5V6.5C20 5.11929 18.8807 4 17.5 4H12C10.8954 4 10 4.89543 10 6V7C10 7.55228 9.55228 8 9 8C8.44772 8 8 7.55228 8 7V6ZM12.2929 8.29289C12.6834 7.90237 13.3166 7.90237 13.7071 8.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L13.7071 15.7071C13.3166 16.0976 12.6834 16.0976 12.2929 15.7071C11.9024 15.3166 11.9024 14.6834 12.2929 14.2929L13.5858 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L13.5858 11L12.2929 9.70711C11.9024 9.31658 11.9024 8.68342 12.2929 8.29289Z" fill="#ffffff"></path> </g></svg>
                                </li></Link>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    )
}