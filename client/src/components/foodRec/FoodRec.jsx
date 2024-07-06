export default function FoodRec() {
    return (
        <div className="card lg:card-side w-full h-fit lg:h-96 bg-white border-2 border-dark-green rounded-md shadow-[0_4px_10px_2px_rgb(0,0,0,0.25)]">
            <div className="card-body flex lg:w-1/2">
                <div className="flex items-center">
                    <div className="h-px w-10 md:w-16 bg-dark-green"></div>
                    <span className="ml-3 text-sm md:text-base text-black">Nuestra selección para ti</span>
                </div>
                <h1 className="py-1 md:py-3 lg:py-6 text-2xl md:text-3xl lg:text-4xl text-black md:text-center lg:text-left font-medium">Chili Mac & Cheese</h1>
                <p className="text-sm md:text-base py-6 md:py-4 lg:py-1 md:text-center lg:text-left">Explora una receta única con ingredientes sorprendentes y técnicas especiales que transformarán tu próxima comida. Descubre cómo crear sabores memorables en tu propia cocina. ¡No te pierdas los detalles!</p>

                <div className="card-actions md:justify-center lg:justify-start">
                    <button className="btn btn-sm text-center text-base font-normal text-white border-0 bg-dark-green hover:bg-accent-green h-10 w-full md:w-96 lg:w-64">Ver más</button>
                </div>
            </div>

            <figure className="h-44 md:h-52 lg:h-full">
                <img className="bg-cover w-full" src="/src/assets/recipe.webp" alt="Recipe cover" />
            </figure>
        </div>
    )
}