import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="footer items-center justify-center md:items-start md:justify-normal p-10 bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] text-sm md:text-base text-black font-normal font-Poppins">
            <aside>
                <Link to={'/'} ><img className="w-48" src="/src/assets/nutrifork-logo-cut.webp" /></Link>
            </aside>
            <nav>
                <h6 className="footer-title">Services</h6>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
            </nav>
            <nav className="hidden md:flex md:flex-col">
                <h6 className="footer-title">Company</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav className="hidden md:flex md:flex-col">
                <h6 className="footer-title">Legal</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
        </footer>
    )
}