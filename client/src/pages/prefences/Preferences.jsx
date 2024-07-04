import { useState } from "react";
import { login } from "../../services/authServices";
import { useNavigate } from "react-router-dom";

export default function Preferences() {

    return (
        <div className="flex justify-center items-center font-Poppins bg-accent-green bg-green bg-cover h-screen">
            <main className="card grid grid-flow-row lg:grid-cols-2 px-2 md:px-10 py-8 lg:p-0 rounded-md border-black border-2 shadow-[0_4px_10px_2px_rgb(0,0,0,0.25)] bg-white w-11/12 lg:w-2/3 h-fit">
                <section className="flex flex-col justify-center order-last lg:order-first lg:pl-16 lg:py-16">
                    <h1 className="text-2xl md:text-4xl text-secondary font-medium">¡Queremos conocerte!</h1>
                    <p className="py-3 text-sm md:text-base text-black font-medium">Para mejorar tu experiencia en NutriFork y ofrecerte las mejores recetas necesitamos saber sobre ti.</p>
                    <form className="w-full">
                        <p className="py-3 text-sm md:text-base text-black font-normal">¿Qué tipo de comida te gusta?</p>
                        <div className="grid md:grid-flow-row md:gap-0 lg:grid-cols-1 lg:gap-8">
                           
                        </div>
                        <p className="py-3 text-sm md:text-base text-black font-normal">¿Qué alimentos no puedes comer?</p>
                        <div className="grid md:grid-flow-row md:gap-0 lg:grid-cols-1 lg:gap-8">
                            
                        </div>
                        <button className="btn btn-sm mt-10 text-center text-base font-normal text-white border-0 bg-dark-green hover:bg-accent-green h-10 w-full md:w-96 lg:w-64" >Comencemos ahora</button>
                    </form>
                </section>
                <section className="flex flex-col items-center justify-center">
                    <img className="w-52 lg:w-44 p-4" src="/src/assets/nutrifork-logo-cut.webp" alt="NutriFork logo" />
                    <img className="w-80 hidden lg:block" src="/src/assets/food-1.webp" alt="Spaghetti" />
                </section>
            </main>
        </div>
    )
}