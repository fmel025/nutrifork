import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";

import { Link } from "react-router-dom";

export default function Recipes({ loggedIn }) {
    return (
        <div className="flex flex-col justify-between font-Poppins min-h-screen w-full bg-white">
            <Navbar loggedIn={loggedIn} />
            <div className="flex flex-col lg:flex-row p-4 lg:p-8">
                <div className="lg:w-[25%] p-4">
                    <img src="/src/assets/recipe.webp" alt="Chili Mac & Cheese" className="w-full lg:w-80 lg:block rounded-lg bg-accent-green shadow-[0_4px_10px_2px_rgb(0,0,0,0.25)]" />
                    <div className="bg-accent-green text-white p-4 rounded-md mt-2 lg:w-80">
                            <h3 className="text-xl font-bold mb-4">Ingredientes</h3>
                                <ul className="list-disc pl-6">
                                    <li className="mb-2">400 g de Carne picada de ternera</li>
                                    <li className="mb-2">1 cucharadita de Chile sin picor</li>
                                    <li className="mb-2">1 variedad de Cebolla</li>
                                    <li className="mb-2">200 g de Frjoles cocidos en conserva</li>
                                    <li className="mb-2">140 g de Queso rallado estilo italiano</li>
                                    <li className="mb-2">80 g de Queso cheddar rallado</li>
                            </ul>
                        </div>
                    </div>
                <div className="lg:w-[65%] p-4">
                    <div className="bg-primary text-primary-content rounded-b-lg p-4">
                        <h2 className="text-4xl font-bold mb-5">Chili Mac & Cheese</h2>
                        <div className="flex justify-between items-center flex-wrap">
                            <div className="badge badge-success rounded-md bg-white border border-black px-4 py-3 mb-2 lg:mb-0">Tiempo de preparación: 20 minutos</div>
                            <div className="badge badge-success rounded-md bg-white border border-black px-4 py-3 mb-2 lg:mb-0">Almuerzo</div>
                            <div className="badge badge-success rounded-md bg-white border border-black px-4 py-3 mb-2 lg:mb-0">Italiana</div>
                            <div className="badge badge-success rounded-md bg-white border border-black px-4 py-3 mb-2 lg:mb-0">Picante</div>
                        </div>
                        <div className="rating rating-lg mt-5">
                            <div className="flex items-center mb-2">
                                <h3 className="text-xl font-bold mr-2">Calificación</h3>
                                <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-base-300 rounded-lg p-4 mt-2">
                        <h3 className="text-xl font-bold mb-4">Instrucciones</h3>
                        <ol className="list-decimal pl-6">
                            <li className="mb-4">Pele y pica la cebolla y los ajos.</li>
                            <li className="mb-4">Lave, seque, quite las semillas y el rabo del pimiento rojo y pique en trocitos.</li>
                            <li className="mb-4">Caliente aceite en una olla grande o fuego alto, agregue el ajo y la cebolla y rehogue 1 minuto.</li>
                            <li className="mb-4">Incorpora la carne y cocínela sin dejar de remover hasta que se vuelva marrón.</li>
                            <li className="mb-4">Pon una tapa y cocína destapado de 12 minutos, vigilando que la pasta no se pase.</li>
                            <li className="mb-4">Caliente aceite en una olla grande o fuego alto, agregue el ajo y la cebolla y rehogue 1 minuto.</li>
                            <li className="mb-4">Incorpora la carne y cocínela sin dejar de remover hasta que se vuelva marrón.</li>
                            <li className="mb-4">Pon una tapa y cocína destapado de 12 minutos, vigilando que la pasta no se pase.</li>
                            <li className="mb-4">Agrega el resto del queso, vuelve a tapar y espera unos 2 minutos a fuego que el queso se funda bien.</li>
                        </ol>
                    </div>
                </div>
            </div>
            <Footer loggedIn={loggedIn} />
        </div>
    );
}