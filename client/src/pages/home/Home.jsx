import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";

export default function Home({ loggedIn }) {
    return (
        <div className="flex flex-col justify-between font-Poppins min-h-screen w-full bg-white">
            <Navbar loggedIn={loggedIn} />

            <Footer loggedIn={loggedIn} />
        </div>
    )
}