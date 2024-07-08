import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import Tag from '../../components/tags/Tag';
import { getUser, getUserFavorites } from '../../services/profileServices';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from "../../components/recipeCard/RecipeCard";

function Profile() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    const getUserData = async () => {
        try {
            const response = await getUser();

            if (response) {
                setUser(response.data);
            }
        } catch (error) {
            console.error('Error al obtener datos de la API:', error);
        } finally {
            setLoading(false);
        }
    };

    const getRecipes = async () => {
        try {
            const response = await getUserFavorites();

            if (response) {
                setRecipes(response.data);
            }
        } catch (error) {
            console.error('Error al obtener datos de la API:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = () => {
        navigate('/ajustes');
    };

    useEffect(() => {
        getUserData();
        getRecipes();
    }, []);

    return (
        <div className="flex flex-col justify-between font-Poppins h-fit w-full lg:min-h-screen bg-white">
            <Navbar />

            <section className="flex flex-col md:flex-row h-full p-10 gap-12">
                <section className='w-full flex flex-col-reverse lg:flex-row text-white p-2 border-2 border-dark-green rounded-md gap-1 bg-accent-green shadow-[0_4px_10px_2px_rgb(0,0,0,0.25)]'>
                    <div className='w-full lg:w-11/12 flex flex-col p-10'>
                        <span className='flex flex-col lg:flex-row items-center w-full justify-between gap-2 lg:gap-0 border-b-2 border-opacity-20 border-black pb-5'>
                            <h1 className='text-3xl'>¡Hola, {loading ? '...' : user.fullName}!</h1>
                            <button onClick={handleEditClick} className="btn btn-sm text-center text-base font-normal text-white border-0 bg-dark-green hover:bg-black h-10 w-full md:w-96 lg:w-52">Editar informacion
                                <svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="edit"> <g> <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path> <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon> </g> </g> </g> </g></svg>
                            </button>
                        </span>

                        <div className='py-5 flex flex-col gap-5'>
                            <p>Usuario: {loading ? '...' : user.username}</p>
                            <p>Correo electrónico: {loading ? '...' : user.email}</p>
                            <span className='flex flex-row gap-3'>
                                <p>Comidas favoritas:</p>
                                {loading ? '...' : user.preferences.map(preference => <Tag key={preference} valor={preference} />)}
                            </span>
                            <span className='flex flex-row gap-3'>
                                <p>Alergias y restricciones:</p>
                                {loading ? '...' : user.allergies.map(allergy => <Tag key={allergy} valor={allergy} />)}
                            </span>
                        </div>
                    </div>
                    <div className="avatar flex items-center justify-center">
                        <div className="w-1/2 md:w-2/5 lg:w-3/4 rounded-full">
                            <img src={!loading && user.avatar ? `${user.avatar}` : "/src/assets/no-picture.webp"} />
                        </div>
                    </div>
                </section>
            </section>

            <section className='flex flex-col w-full p-10'>
                <h1 className="text-2xl md:text-3xl lg:text-4xl text-black font-medium">Recetas guardadas</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-10  gap-8 w-full">
                    {recipes.map(recipe => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Profile;
