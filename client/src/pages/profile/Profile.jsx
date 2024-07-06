import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import PrefDropdown from '../../components/prefDropdown/PrefDropdown';
import Tag from '../../components/tags/Tag';
import { useEffect, useState } from 'react';

function Profile() {
  return (
    <div className="flex flex-col justify-between font-Poppins h-fit w-full lg:min-h-screen bg-white">
    <Navbar />

    <section className="flex flex-col md:flex-row h-full p-10 gap-12">
        <section className='w-full flex flex-row text-white border-2 border-dark-green rounded-md gap-1 bg-accent-green shadow-[0_4px_10px_2px_rgb(0,0,0,0.25)]'>
            <div className='w-11/12 flex flex-col p-10'>
                <span className='flex flex-row items-center w-full justify-between'>
                <h1 className='text-3xl'>¡Hola, Juanito Alcachofa!</h1>
                <button className="btn btn-sm text-center text-base font-normal text-white border-0 bg-dark-green hover:bg-accent-green h-8  md:w-96 lg:w-64">Editar informacion</button>
                </span>
                
                <div className='py-5 flex flex-col gap-5'>
                    <p>Usuario: Nombredeusuario</p>
                    <p>Correo electrónico: Correo</p>
                    <span className='flex flex-row gap-3'>
                        <p>Comidas favoritas:</p>
                        <Tag valor="Italiana"/><Tag valor="Italiana"/><Tag valor="Italiana"/><Tag valor="Italiana"/>
                    </span>
                    <span className='flex flex-row gap-3'>
                        <p>Alergias y restricciones:</p>
                        <Tag valor="Italiana"/><Tag valor="Italiana"/><Tag valor="Italiana"/><Tag valor="Italiana"/>
                    </span>
                </div>
            </div>
            <div className="avatar flex items-center justify-center">
                        <div className="w-3/5 rounded-full">
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

export default Profile