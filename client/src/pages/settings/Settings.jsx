import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import PrefDropdown from '../../components/prefDropdown/PrefDropdown';
import Avatar from '../../components/avatar/Avatar';
import ChangeAvatarBtn from '../../components/changeAvatarBtn/ChangeAvatarBtn';
import { useEffect, useState } from 'react';
import { deleteAccount, getUser, updateUser } from '../../services/profileServices';
import { useNavigate } from 'react-router-dom';
import { getAllergies, getFoodOptions } from '../../services/categoriesServices';

export default function Settings() {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value
        }));
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
        } catch (error) {
            console.error('Error al actualizar datos: ', error);
        }
    };

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm("¿Estás seguro de que deseas borrar tu cuenta? Esta acción no se puede deshacer.");

        if (confirmed) {
            try {
                await deleteAccount();
                localStorage.removeItem('token');
                alert("Tu cuenta ha sido eliminada.");
                navigate('/');
                window.location.reload();
            } catch (error) {
                console.error('Error al borrar la cuenta: ', error);
                alert("Hubo un problema al borrar tu cuenta. Por favor intenta de nuevo.");
            }
        }
    };

    useEffect(() => {
        getUserData();
        fetchAllergies();
        fetchFoodOptions();
    }, []);

    return (
        <div className="flex flex-col justify-between font-Poppins h-fit w-full lg:min-h-screen bg-white">
            <Navbar />

            <div className="flex flex-col md:flex-row h-full p-10 gap-12">
                <div className="flex flex-col border-2 border-dark-green rounded-md gap-1 bg-accent-green md:w-[240px] lg:w-[280px] h-fit p-4 shadow-[0_4px_10px_2px_rgb(0,0,0,0.25)]">
                    <a href="#informacion" className="flex justify-start btn btn-sm text-xs md:text-sm lg:text-base font-normal text-white border-0 shadow-none hover:bg-hover-green h-10 w-full">Información personal</a>
                    <a href="#detalles" className="flex justify-start btn btn-sm text-xs md:text-sm lg:text-base font-normal text-white border-0 shadow-none hover:bg-hover-green h-10 w-full">Detalles de la cuenta</a>
                </div>

                <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl text-black font-medium">Ajustes</h1>

                    <h2 id="informacion" className="text-xl md:text-2xl lg:text-3xl text-black font-medium py-6">Información personal</h2>
                    <div className="flex flex-col items-center w-full md:hidden">
                        <Avatar width="w-1/2" />
                        <ChangeAvatarBtn />
                    </div>

                    <form onSubmit={handleSubmit} className="w-full text-sm md:text-base">
                        <p className="py-3 text-black font-normal">Nombre</p>
                        <input name="fullName" value={userData.fullName} onChange={handleChange} type="text" className="input h-10 rounded-md input-bordered focus:border-2 text-xs md:text-sm focus:outline-0 w-full" />
                        <p className="py-3 text-black font-normal">Usuario</p>
                        <input name="username" value={userData.username} onChange={handleChange} type="text" className="input h-10 rounded-md input-bordered focus:border-2 text-xs md:text-sm focus:outline-0 w-full" />
                        <p className="py-3 text-black font-normal">Correo electrónico</p>
                        <input name="email" value={userData.email} onChange={handleChange} type="email" className="input h-10 rounded-md input-bordered focus:border-2 text-xs md:text-sm focus:outline-0 w-full" />
                        <p className="py-3 text-black font-normal">Contraseña</p>
                        <input name="password" placeholder='**********' type="password" className="input placeholder:text-black h-10 rounded-md input-bordered text-xs md:text-sm focus:border-2 focus:outline-0 w-full" />
                        <PrefDropdown
                            label="Comidas favoritas"
                            options={foodData}
                            selectedOptions={userData.preferences}
                            placeholder="Selecciona tus comidas preferidas"
                            onChange={handlePreferencesChange}
                        />
                        <PrefDropdown
                            label="Alergias"
                            options={allergyData}
                            selectedOptions={userData.allergies}
                            placeholder="Selecciona tus alergias"
                            onChange={handleAllergiesChange}
                        />

                        <button type='submit' className="btn btn-sm my-10 text-center text-base font-normal text-white border-0 bg-dark-green hover:bg-accent-green h-10 w-full md:w-96 lg:w-64">Guardar cambios</button>
                    </form>

                    <h2 id="detalles" className="text-xl md:text-2xl lg:text-3xl text-black font-medium py-6">Detalles de la cuenta</h2>
                    <p className="py-3 text-lg md:text-xl text-danger font-medium">Borrar cuenta</p>
                    <p className="py-1 text-sm md:text-base text-black font-normal">Una vez que borres tu cuenta, no hay vuelta atrás. Procede con precaución.</p>
                    <button onClick={handleDeleteAccount} className="btn btn-sm my-8 text-center text-base font-normal text-white border-0 bg-danger hover:bg-red-600 h-10 w-full md:w-96 lg:w-64">Borrar mi cuenta</button>
                </div>

                <div className="w-[240px] hidden md:block">
                    <Avatar width="w-fit" />
                    <ChangeAvatarBtn />
                </div>
            </div>

            <Footer />
        </div>
    );
}
