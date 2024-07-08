import { useEffect, useState } from "react";
import { getUser } from "../../services/profileServices";

export default function Avatar({ width }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div className={`avatar ${width}`}>
            <div className="w-full rounded-full">
                <img src={!loading && user.avatar ? `${user.avatar}` : "no-picture.webp"} alt="Avatar" />
            </div>
        </div>
    );
}