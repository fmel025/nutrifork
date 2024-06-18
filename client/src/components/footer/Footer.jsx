import { useContext } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../utils/AuthContext';

export default function Footer() {
    const { loggedIn } = useContext(AuthContext);

    return (
        <footer className="footer items-center justify-center md:items-start md:justify-normal p-10 bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] text-sm md:text-base text-black font-normal font-Poppins">
            <aside>
                <Link to={'/'} ><img className="w-48" src="/src/assets/nutrifork-logo-cut.webp" /></Link>
            </aside>
            <nav>
                <h6 className="footer-title">Enlaces útiles</h6>
                <Link><a className="link link-hover">¿Quiénes somos?</a></Link>
                <Link to={'/'}><a className="link link-hover">Recetas</a></Link>
                {loggedIn ? (
                    <>
                        <Link><a className="link link-hover">Perfil</a></Link>
                        <Link to={'/ajustes'}><a className="link link-hover">Ajustes</a></Link>
                    </>
                ) : (
                    <Link to={'/iniciar-sesion'}><a className="link link-hover">Inicia sesión</a></Link>
                )}
            </nav>
        </footer>
    )
}