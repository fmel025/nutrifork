import { useState } from "react";
import { login } from "../../services/authServices";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const token = await login(email, password);

            if (token) {
                localStorage.setItem('token', token);
                navigate('/');
                window.location.reload();
            } else {
                alert("Login failed. Invalid credentials.");
            }
        } catch (error) {
            alert("Credenciales incorrectas.");
            console.error('An error occurred during login:', error);
        }
    };

    return (
        <div className="flex justify-center items-center font-Poppins bg-accent-green bg-green bg-cover h-screen">
            <main className="card grid grid-flow-row lg:grid-cols-2 px-2 md:px-10 py-8 lg:p-0 rounded-md border-black border-2 shadow-[0_4px_10px_2px_rgb(0,0,0,0.25)] bg-white w-11/12 lg:w-2/3 h-fit">
                <section className="flex flex-col justify-center order-last lg:order-first lg:pl-16 lg:py-16">
                    <h1 className="text-2xl md:text-4xl text-secondary font-medium">¡Hola de nuevo!</h1>
                    <p className="py-3 text-sm md:text-base text-black font-medium">Por favor, ingresa tus datos.</p>

                    <form className="w-full" onSubmit={handleLogin}>
                        <p className="py-3 text-sm md:text-base text-black font-normal">Correo electrónico</p>
                        <input type="text" className="input h-10 rounded-md input-bordered focus:border-2 focus:outline-0 w-full" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <p className="py-3 text-sm md:text-base text-black font-normal">Contraseña</p>
                        <input type="password" className="input h-10 rounded-md input-bordered focus:border-2 focus:outline-0 w-full" value={password} onChange={(e) => setPassword(e.target.value)} required />

                        <button type="submit" className="btn btn-sm mt-10 text-center text-base font-normal text-white border-0 bg-dark-green hover:bg-accent-green h-10 w-full md:w-96 lg:w-64" onClick={handleLogin}>Inicia sesión</button>
                        <p className="py-1 text-xs text-black font-normal">¿No tienes una cuenta? <a href="/registrarse" className="text-secondary font-semibold">Regístrate</a></p>
                    </form>

                </section>

                <section className="flex flex-col items-center justify-center">
                    <img className="w-52 lg:w-44 p-4" src="nutrifork-logo-cut.webp" alt="NutriFork logo" />
                    <img className="w-80 hidden lg:block" src="food-1.webp" alt="Spaghetti" />
                </section>
            </main>
        </div>
    )
}