import { useState, useEffect } from 'react';
import { updateAvatar } from '../../services/profileServices';

export default function ChangeAvatarBtn() {
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(false);
    }, [avatar]);

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; // Tipos de archivo permitidos

        if (!allowedTypes.includes(file.type)) {
            setError('Tipo de archivo no permitido. Por favor selecciona una imagen JPEG, PNG o GIF.');
            return;
        }

        setAvatar(file);
        setLoading(true);

        try {
            await updateAvatar(file);
            setError(null);
            window.location.reload();
        } catch (error) {
            console.error('Error al actualizar el avatar: ', error);
            setError('Error al actualizar el avatar. Por favor intenta de nuevo.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            {error && (
                <div className="text-danger text-center text-xs my-2 w-9/12">{error}</div>
            )}

            {loading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-sm">Cargando...</div>
            )}
            
            <input className="w-4/6 md:w-full mt-4 text-base text-black border rounded-lg cursor-pointer bg-dark-green dark:text-white dark:bg-dark-green" type="file" onChange={handleAvatarChange} />
        </div>
    );
}
