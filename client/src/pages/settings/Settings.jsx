import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import PrefDropdown from '../../components/prefDropdown/PrefDropdown';
import { useEffect, useState } from 'react';

export default function Settings() {
    const foodOptions = ['Mexicana', 'Ensaladas', 'Italiana'];
    const restrictionOptions = ['Gluten', 'Lácteos', 'Mariscos'];
    const [userData, setUserData] = useState({
        name: 'defaultName',
        username: 'defaultUsername',
        email: 'defaultEmail@example.com',
        password: '1234hola',
    });

    const handleChange = (e) => {
        // Update the userData state when input changes
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        // Example fetch function
        // fetchUserData().then(data => setUserData(data));
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
                        <div className="avatar flex flex-col items-center justify-center w-1/2">
                            <div className="w-full rounded-full">
                                <img src="/src/assets/avatar.webp" />
                            </div>
                        </div>

                        <input className="w-4/6 md:w-full mt-4 text-base text-black border rounded-lg cursor-pointer bg-dark-green dark:text-white dark:bg-dark-green" type="file" />
                    </div>

                    <form className="w-full text-sm md:text-base">
                        <p className="py-3 text-black font-normal">Nombre</p>
                        <input value={userData.name} onChange={handleChange} type="text" className="input h-10 rounded-md input-bordered focus:border-2 text-xs md:text-sm focus:outline-0 w-full" />
                        <p className="py-3 text-black font-normal">Usuario</p>
                        <input value={userData.username} onChange={handleChange} type="text" className="input h-10 rounded-md input-bordered focus:border-2 text-xs md:text-sm focus:outline-0 w-full" />
                        <p className="py-3 text-black font-normal">Correo electrónico</p>
                        <input value={userData.email} onChange={handleChange} type="email" className="input h-10 rounded-md input-bordered focus:border-2 text-xs md:text-sm focus:outline-0 w-full" />
                        <p className="py-3 text-black font-normal">Contraseña</p>
                        <input value={userData.password} onChange={handleChange} type="password" className="input h-10 rounded-md input-bordered text-xs md:text-sm focus:border-2 focus:outline-0 w-full" />

                        <div className="grid md:grid-flow-row md:gap-0 lg:grid-cols-2 lg:gap-8">
                            <PrefDropdown label="Comidas favoritas" options={foodOptions} placeholder="3 opciones seleccionadas" />
                            <PrefDropdown label="Alergias" options={restrictionOptions} placeholder="2 opciones seleccionadas" />
                        </div>

                        <button className="btn btn-sm my-10 text-center text-base font-normal text-white border-0 bg-dark-green hover:bg-accent-green h-10 w-full md:w-96 lg:w-64">Guardar cambios</button>
                    </form>

                    <h2 id="detalles" className="text-xl md:text-2xl lg:text-3xl text-black font-medium py-6">Detalles de la cuenta</h2>
                    <p className="py-3 text-lg md:text-xl text-danger font-medium">Borrar cuenta</p>
                    <p className="py-1 text-sm md:text-base text-black font-normal">Una vez que borres tu cuenta, no hay vuelta atrás. Procede con precaución.</p>
                    <button className="btn btn-sm my-8 text-center text-base font-normal text-white border-0 bg-danger hover:bg-red-600 h-10 w-full md:w-96 lg:w-64">Borrar mi cuenta</button>
                </div>

                <div className="w-[240px] hidden md:block">
                    <div className="avatar">
                        <div className="w-full rounded-full">
                            <img src="/src/assets/avatar.webp" />
                        </div>
                    </div>

                    <input className="w-4/6 md:w-full mt-4 text-base text-black border rounded-lg cursor-pointer bg-dark-green dark:text-white dark:bg-dark-green" type="file" />
                </div>
            </div>

            <Footer />
        </div>
    );
}
