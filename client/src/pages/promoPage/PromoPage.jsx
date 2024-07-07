import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import RecipeCard from "../../components/recipeCard/RecipeCard";
import { getAllRecipes } from '../../services/recipeServices';
import { useEffect, useState } from 'react';

export default function PromoPage() {
    const [loading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState([]);

    const getRecipes = async () => {
        try {
            const response = await getAllRecipes();

            if (response) {
                setRecipes(response.data);
                console.log(response.data);
            }
        } catch (error) {
            console.error('Error al obtener datos de la API:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getRecipes();
    }, []);

    return (
        <div className="flex flex-col justify-between font-Poppins min-h-screen w-full bg-white">
            <Navbar />
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse items-center">
                    <img src="/src/assets/food-3.webp" className="w-full max-w-2xl lg:max-w-3xl lg:w-2/4 lg:ml-8" alt="Comida" />
                    <div className="w-full lg:w-1/2 px-4 lg:px-8 mt-4 lg:mt-0 lg:mr-8 text-left">
                        <h1 className="text-5xl font-bold mb-4 text-primary">Comida saludable y deliciosa</h1>
                        <p className="py-6">La comida saludable no tiene por qué ser aburrida. Existen innumerables opciones deliciosas que benefician tu cuerpo y mente.</p>
                        <Link to={'/iniciar-sesion'}>
                        <button className="btn btn-primary btn-sm mt-4 text-center text-base font-normal text-white border-0 bg-accent-green hover:bg-dark-green h-10 w-full md:w-96 lg:w-64">
                                Descubre más
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="container mx-auto text-center py-8">
                <h1 className="text-2xl font-bold mb-8">Platillos populares</h1>
                <div className="flex flex-row justify-center items-center space-x-4">
                    <div className="flex flex-col items-center">
                        <img src="/src/assets/potatoes.webp" alt="Papas" className="w-42 h-72 px-20"/>
                    </div>
                    <div className="flex w-3/5 gap-2 ">
                        {recipes.slice(0, 3).map(recipe => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))}
                    </div>

                    
                    <div className="flex flex-col items-center">
                        <img src="/src/assets/leaf.webp" alt="Hojas" className="w-42 h-72 px-20"/>
                    </div>
                </div>
            </div>

            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row items-center">
                    <img src="/src/assets/food-4.webp" className="w-full max-w-md lg:max-w-lg lg:w-1/2 lg:ml-8" alt="Vegetales" />
                    <div className="w-full lg:w-1/2 px-4 lg:px-8 mt-6 lg:mt-0 lg:ml-8 text-left lg:text-right">
                        <h1 className="text-5xl font-bold mb-4 text-primary">Descubre cientos de recetas en NutriFork</h1>
                        <p className="py-6">Queremos ayudar a las personas a mejorar su salud y bienestar a través de una alimentación más consciente, adaptada a sus preferencias y necesidades.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}