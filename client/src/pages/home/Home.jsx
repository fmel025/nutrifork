import FoodRec from "../../components/foodRec/FoodRec";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import RecipeCard from "../../components/recipeCard/RecipeCard";

export default function Home() {
    return (
        <div className="flex flex-col justify-between font-Poppins min-h-screen w-full bg-white">
            <Navbar />

            <div className="h-fit p-10">
                <FoodRec />

                <h1 className="text-2xl md:text-3xl lg:text-4xl text-center text-secondary font-medium mt-20 mb-8">Categorías</h1>

                <div className="flex w-full gap-6 overflow-x-auto py-4">
                    <button className="btn btn-sm text-center text-base font-normal text-black hover:text-white border-2 bg-white hover:bg-dark-green px-8 h-10 w-fit">Todas</button>
                    <button className="btn btn-sm text-center text-base font-normal text-black hover:text-white border-2 bg-white hover:bg-dark-green px-8 h-10 w-fit">Categoría</button>
                    <button className="btn btn-sm text-center text-base font-normal text-black hover:text-white border-2 bg-white hover:bg-dark-green px-8 h-10 w-fit">Categoría</button>
                    <button className="btn btn-sm text-center text-base font-normal text-black hover:text-white border-2 bg-white hover:bg-dark-green px-8 h-10 w-fit">Categoría</button>
                    <button className="btn btn-sm text-center text-base font-normal text-black hover:text-white border-2 bg-white hover:bg-dark-green px-8 h-10 w-fit">Categoría</button>
                    <button className="btn btn-sm text-center text-base font-normal text-black hover:text-white border-2 bg-white hover:bg-dark-green px-8 h-10 w-fit">Categoría</button>
                    <button className="btn btn-sm text-center text-base font-normal text-black hover:text-white border-2 bg-white hover:bg-dark-green px-8 h-10 w-fit">Categoría</button>
                    <button className="btn btn-sm text-center text-base font-normal text-black hover:text-white border-2 bg-white hover:bg-dark-green px-8 h-10 w-fit">Categoría</button>
                    <button className="btn btn-sm text-center text-base font-normal text-black hover:text-white border-2 bg-white hover:bg-dark-green px-8 h-10 w-fit">Categoría</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 gap-8 w-full">
                    
                </div>
            </div>

            <Footer />
        </div>
    )
}