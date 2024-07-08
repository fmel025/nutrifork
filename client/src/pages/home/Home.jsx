import { useEffect, useState } from "react";
import FoodRec from "../../components/foodRec/FoodRec";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { getAllCategories } from "../../services/categoriesServices";
import { getAllRecipes } from "../../services/recipeServices";
import RecipeCard from "../../components/recipeCard/RecipeCard";

export default function Home() {
    const [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    const fetchRecipes = async (category = '') => {
        const response = await getAllRecipes(category);

        if (response) {
            setRecipes(response.data);
        }
    };

    const fetchCategories = async () => {
        const data = await getAllCategories();
        setCategories(data);
    };

    const handleCategoryClick = (category) => {
        if (category === selectedCategory) {
            setSelectedCategory('');
            fetchRecipes();
        } else {
            setSelectedCategory(category);
            fetchRecipes(category);
        }
    };

    useEffect(() => {
        fetchRecipes();
        fetchCategories();
    }, []);

    return (
        <div className="flex flex-col justify-between font-Poppins min-h-screen w-full bg-white">
            <Navbar />

            <div className="h-fit p-10">
                <FoodRec />

                <h1 className="text-2xl md:text-3xl lg:text-4xl text-center text-secondary font-medium mt-20 mb-8">Categorías</h1>

                <div className="flex w-full gap-6 overflow-x-auto py-4">
                    {/* Toggle button style based on selectedCategory */}
                    {categories.map((category, id) => (
                        <button
                            key={id}
                            className={`btn btn-sm text-center text-base font-normal text-black border-2 bg-white px-8 h-10 w-fit ${selectedCategory === category ? 'bg-gray-300 text-black' : 'hover:bg-white hover:text-black'}`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 gap-8 w-full">
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    )
}
