import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById, updateRating } from '../../services/recipeServices';
import RecipeTag from '../../components/tags/RecipeTag';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

export default function Recipes({ loggedIn }) {
    const { id: recipeId } = useParams();
    const [loading, setLoading] = useState(true);
    const [recipe, setRecipe] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    const getRecipe = async () => {
        try {
            const response = await getRecipeById(recipeId);

            if (response) {
                console.log(response.data);
                setRecipe(response.data);
                setIsFavorite(response.data.favoriteByUser);
            }
        } catch (error) {
            console.error('Error al obtener datos de la API:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFavoriteToggle = async () => {
        try {
            const newFavoriteStatus = !isFavorite;
            setIsFavorite(newFavoriteStatus);
            // Llama a tu función de servicio para actualizar el favorito en el servidor
            // await updateRecipeFavorite(recipe.id); // Comentado porque la función no está definida en el código proporcionado
        } catch (error) {
            console.error('Error updating favorite status:', error);
            // Revertir el estado en caso de error
            setIsFavorite(!isFavorite);
        }
    };

    const handleRatingClick = async (rating) => {
        try {
            setRecipe((prevRecipe) => ({
                ...prevRecipe,
                ratingByUser: rating,
            }));

            await updateRating(recipe.id, rating);
        } catch (error) {
            console.error('Error updating rating:', error);
            setRecipe((prevRecipe) => ({
                ...prevRecipe,
                ratingByUser: null, 
            }));
        }
    };

    useEffect(() => {
        getRecipe();
    }, []);

    if (loading || !recipe) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-2xl">Cargando receta...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-between font-Poppins min-h-screen w-full bg-white">
            <Navbar loggedIn={loggedIn} />
            <div className="flex flex-col lg:flex-row p-4 lg:p-8">
                <div className="lg:w-[25%] p-4">
                    <img
                        src={loading ? '' : recipe.image}
                        alt="Chili Mac & Cheese"
                        className="w-full lg:w-80 lg:block rounded-lg bg-accent-green shadow-[0_4px_10px_2px_rgb(0,0,0,0.25)]"
                    />
                    <div className="bg-accent-green text-white p-4 rounded-md mt-2 lg:w-80">
                        <h3 className="text-xl font-bold mb-4">Ingredientes</h3>
                        <ul className="list-disc pl-6">
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index} className="mb-2">
                                    {ingredient}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="lg:w-[65%] p-4">
                    <div className="bg-primary text-primary-content rounded-b-lg p-4">
                        <div className="flex items-center mb-5 gap-5">
                            <h2 className="text-4xl font-bold">{loading ? '...' : recipe.name}</h2>
                            <button onClick={handleFavoriteToggle}>
                                <svg
                                    width="30px"
                                    height="30px"
                                    viewBox="0 0 64 64"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M45.35 6.1709H19.41C16.8178 6.17618 14.3333 7.20827 12.5003 9.04123C10.6674 10.8742 9.63528 13.3587 9.62999 15.9509V52.2709C9.6272 53.3655 9.92973 54.4392 10.5036 55.3713C11.0775 56.3034 11.9 57.057 12.8787 57.5474C13.8573 58.0377 14.9533 58.2454 16.0435 58.1471C17.1337 58.0488 18.1748 57.6484 19.05 56.9909L31.25 47.8509C31.5783 47.6074 31.9762 47.4759 32.385 47.4759C32.7938 47.4759 33.1917 47.6074 33.52 47.8509L45.71 56.9809C46.5842 57.6387 47.6246 58.0397 48.7142 58.1387C49.8038 58.2378 50.8994 58.0311 51.8779 57.5418C52.8565 57.0525 53.6793 56.3001 54.2537 55.3689C54.8282 54.4378 55.1317 53.365 55.13 52.2709V15.9509C55.1247 13.3587 54.0926 10.8742 52.2597 9.04123C50.4267 7.20827 47.9422 6.17618 45.35 6.1709Z"
                                        fill={isFavorite ? '#000000' : 'none'}
                                        stroke="#000000"
                                        strokeWidth="2"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-start gap-5 items-left flex-wrap">
                            {recipe.categories.map((category, index) => (
                                <RecipeTag key={index} valor={category} />
                            ))}
                        </div>
                        <div className="rating rating-lg mt-5">
                            <div className="flex items-center mb-2">
                                <h3 className="text-xl font-bold mr-2">Calificación</h3>
                                {[...Array(5)].map((_, index) => (
                                    <svg
                                        key={index}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill={index < recipe.ratingByUser ? 'currentColor' : 'none'}
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className={`w-6 h-6 ${index < recipe.ratingByUser ? 'text-orange-400' : 'text-gray-300 hover:text-orange-400'}`}
                                        onClick={() => handleRatingClick(index + 1)}
                                    >
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="bg-base-300 rounded-lg p-4 mt-2">
                        <h3 className="text-xl font-bold mb-4">Instrucciones</h3>
                        <ol className="list-decimal pl-6">
                            {recipe.instructions.map((instruction, index) => (
                                <li key={index} className="mb-2">
                                    {instruction}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
            <Footer loggedIn={loggedIn} />
        </div>
    );
}
