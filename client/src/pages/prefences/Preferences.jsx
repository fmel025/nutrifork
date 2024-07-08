import PrefDropdown from '../../components/prefDropdown/PrefDropdown';
import { useEffect, useState } from 'react';
import { getUser, updateUser } from '../../services/profileServices';
import { getAllergies, getFoodOptions } from '../../services/categoriesServices';
import { useNavigate } from 'react-router-dom';

export default function Preferences() {
    const navigate = useNavigate();
    const [allergyData, setAllergyData] = useState([]);
    const [foodData, setFoodData] = useState([]);
    const [userData, setUserData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        allergies: [], // Aquí se guardarán las alergias seleccionadas
        preferences: [] // Aquí se guardarán las preferencias seleccionadas
    });

    const getUserData = async () => {
        try {
            const response = await getUser();

            if (response) {
                setUserData(response.data);
            }
        } catch (error) {
            console.error('Error al obtener datos de la API:', error);
        }
    };

    const fetchAllergies = async () => {
        try {
            const response = await getAllergies();

            if (response) {
                setAllergyData(response);
            }
        } catch (error) {
            console.error('Error al obtener datos de la API:', error);
        }
    };

    const fetchFoodOptions = async () => {
        try {
            const response = await getFoodOptions();

            if (response) {
                setFoodData(response);
            }
        } catch (error) {
            console.error('Error al obtener datos de la API:', error);
        }
    };

    const handleAllergiesChange = (selectedAllergies) => {
        setUserData((prevUserData) => ({
            ...prevUserData,
            allergies: selectedAllergies // Actualiza las alergias seleccionadas en el estado de userData
        }));
    };

    const handlePreferencesChange = (selectedPreferences) => {
        setUserData((prevUserData) => ({
            ...prevUserData,
            preferences: selectedPreferences // Actualiza las preferencias seleccionadas en el estado de userData
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { fullName, username, email, password, allergies, preferences } = userData;
            await updateUser({ fullName, username, email, password, allergies, preferences });
            console.log('Datos actualizados.');
            navigate('/');

        } catch (error) {
            console.error('Error al actualizar datos: ', error);
        }
    };

    useEffect(() => {
        getUserData();
        fetchAllergies();
        fetchFoodOptions();
    }, []);

    return (
        <div className="flex justify-center items-center font-Poppins bg-accent-green bg-green bg-cover h-screen">
            <main className="card grid grid-flow-row lg:grid-cols-2 px-2 md:px-10 py-8 lg:p-0 rounded-md border-black border-2 shadow-[0_4px_10px_2px_rgb(0,0,0,0.25)] bg-white w-11/12 lg:w-2/3 h-fit">
                <section className="flex flex-col justify-center order-last lg:order-first lg:pl-16 lg:py-16">
                    <h1 className="text-2xl md:text-4xl text-secondary font-medium">¡Queremos conocerte!</h1>
                    <p className="py-3 text-sm md:text-base text-black font-medium">Para mejorar tu experiencia en NutriFork y ofrecerte las mejores recetas necesitamos saber sobre ti.</p>
                    <form onSubmit={handleSubmit} className="w-full">
                            <PrefDropdown
                                label="¿Qué tipo de comida te gusta?"
                                options={foodData}
                                selectedOptions={userData.preferences}
                                placeholder="Selecciona tus comidas preferidas"
                                onChange={handlePreferencesChange}
                            />
                            <PrefDropdown
                                label="¿Qué alimentos no puedes comer (por motivos de salud o restricciones alimenticias)?"
                                options={allergyData}
                                selectedOptions={userData.allergies}
                                placeholder="Selecciona tus alergias"
                                onChange={handleAllergiesChange}
                            />
                        
                        <button type="submit" className="btn btn-sm mt-10 text-center text-base font-normal text-white border-0 bg-dark-green hover:bg-accent-green h-10 w-full md:w-96 lg:w-64" >Comencemos ahora</button>
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