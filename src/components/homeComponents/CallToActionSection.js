import React from "react";

const CallToActionSection = () => {
  return (
    <div className="bg-with-black py-12">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">¿Quieres mantenerte actualizado?</h2>
          <p className="text-gray-600">Síguenos y obtén las últimas novedades</p>
        </div>
        <form className="mt-8 max-w-md mx-auto">
          <div className="flex items-center border-b border-b-2 border-white py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-primary mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="email"
              placeholder="Tu correo electrónico..."
              aria-label="Email"
              name="email"
            />
            <button
              className="flex-shrink-0 bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-sm border-4 text-white py-1 px-2 rounded"
              type="submit"
            >
              Suscripción
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CallToActionSection;
