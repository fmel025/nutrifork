import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";

export default function Error404() {
    return (
        <div className="flex flex-col justify-between font-Poppins h-screen">
            <Navbar />
            <section className="bg-accent-green opacity-10 h-full"></section>
            <Footer />
        </div>
    )
}