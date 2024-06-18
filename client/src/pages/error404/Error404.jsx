import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";

export default function Error404() {
    return (
        <div className="flex flex-col justify-between font-Poppins h-fit w-full lg:h-screen bg-light-green">
            <Navbar />

            <section className="grid lg:grid-cols-2 h-full">
                <div className="flex flex-col justify-center md:items-center lg:items-start gap-4 lg:gap-0 p-6 md:px-20 lg:p-20">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl text-black font-medium">¡Ups! Página no encontrada</h1>
                    <p className="lg:py-10 text-base lg:text-lg text-black font-normal">Lo sentimos, parece que la página que estabas buscando no existe o ha sido eliminada.</p>
                    <Link to={'/'}><button className="btn btn-sm text-center text-base font-normal text-white border-0 bg-dark-green hover:bg-accent-green h-10 w-full md:w-96 lg:w-64">Regresar al inicio</button></Link>
                </div>

                <div className="flex items-center justify-center p-6 lg:p-0">
                    <img className="h-28 md:h-40 lg:h-48" src="/src/assets/four.webp" alt="Four number" />
                    <img className="h-28 md:h-40 lg:h-48" src="/src/assets/food-2.webp" alt="Salad" />
                    <img className="h-28 md:h-40 lg:h-48" src="/src/assets/four.webp" alt="Four number" />
                </div>
            </section>

            <Footer />
        </div>
    )
}