export default function Login() {
    return (
        <div className="flex justify-center items-center font-Poppins bg-accent-green bg-green bg-cover h-screen">
            <main className="card grid grid-cols-2 rounded-md border-black border-2 shadow-[0_4px_10px_2px_rgb(0,0,0,0.25)] bg-white w-5/6 lg:w-2/3 h-fit">
                <section className="flex flex-col justify-center pl-16 py-16">
                    <h1 className="text-4xl text-secondary font-medium">¡Hola de nuevo!</h1>
                    <p className="py-3 text-base text-black font-medium">Por favor, ingresa tus datos.</p>
                    <form className="w-full">
                        <p className="py-3 text-base text-black font-normal">Usuario o correo electrónico</p>
                        <input type="text" className="input h-10 rounded-md input-bordered focus:border-2 focus:outline-0 w-full" />
                        <p className="py-3 text-base text-black font-normal">Contraseña</p>
                        <input type="password" className="input h-10 rounded-md input-bordered focus:border-2 focus:outline-0 w-full" />
                        <button className="btn btn-sm mt-10 text-center text-base font-normal text-white bg-dark-green hover:bg-accent-green h-10 w-72">Inicia sesión</button>
                        <p className="py-1 text-xs text-black font-normal">¿No tienes una cuenta? <a href="" className="text-secondary font-semibold">Regístrate</a></p>
                    </form>
                </section>
                <section className="flex flex-col items-center justify-center">
                    <img className="w-44" src="/src/assets/nutrifork-logo-cut.webp" alt="NutriFork logo" />
                    <img className="w-80" src="/src/assets/food-1.webp" alt="Spaghetti" />
                </section>
            </main>
        </div>
    )
}