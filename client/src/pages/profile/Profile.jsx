import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import Tag from '../../components/tags/Tag';
import { getUser } from '../../services/profileServices';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const getUserData = async () => {
        try {
            const response = await getUser();

            if (response) {
                console.log("User fetched:", response.data);
                setUser(response.data);
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
    }, []);

    return (
        <div className="flex flex-col justify-between font-Poppins h-fit w-full lg:min-h-screen bg-white">
            <Navbar />

            <section className="flex flex-col md:flex-row h-full p-2 lg:p-10 gap-12">
                <section className='w-full flex flex-col-reverse lg:flex-row text-white border-2 border-dark-green rounded-md gap-1 bg-accent-green shadow-[0_4px_10px_2px_rgb(0,0,0,0.25)]'>
                    <div className='w-full lg:w-11/12 flex flex-col p-10'>
                        <span className='flex flex-col lg:flex-row items-center w-full justify-between gap-2 lg:gap-0'>
                            <h1 className='text-3xl'>¡Hola, {loading ? '...' : user.fullName}!</h1>
                            <button onClick={handleEditClick} className="btn btn-sm text-center text-base font-normal text-white border-0 bg-dark-green hover:bg-accent-green h-8  md:w-96 lg:w-64">Editar informacion</button>
                        </span>
                        
                        <div className='py-5 flex flex-col gap-5'>
                            <p>Usuario: {loading ? '...' : user.username}</p>
                            <p>Correo electrónico: {loading ? '...' : user.email}</p>
                            <span className='flex flex-row gap-3'>
                                <p>Comidas favoritas:</p>
                            </span>
                            <span className='flex flex-row gap-3'>
                                <p>Alergias y restricciones:</p>
                                {loading ? '...' : user.alergies.map(allergy => <Tag key={allergy} valor={allergy} />)}
                            </span>
                        </div>
                    </div>
                    <div className="avatar flex items-center justify-center">
                        <div className="w-1/2 lg:w-3/5 rounded-full">
                            <img src="/src/assets/avatars/avatar-8.webp" />
                        </div>
                    </div>
                </section>
            </section>

            <section className='flex flex-col w-full px-10'>
                <h1 className='text-3xl font-semibold'>Recetas guardadas</h1>
            </section>

            <Footer />
        </div>
    )
}

export default Profile;
