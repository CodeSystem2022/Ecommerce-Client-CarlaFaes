import React from 'react';

const Footer = () => {
  return (
    <div className="bg-primary mt-16">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sobre nosotros */}
          <div className="col-span-1">
            <h2 className="text-white text-lg font-semibold mb-4">Sobre nosotros</h2>
            <p className="text-gray-300">
              Somos una tienda de muebles de diseño comprometida con la calidad y la excelencia en el servicio.
            </p>
          </div>

          {/* Enlaces útiles */}
          <div className="col-span-1">
            <h2 className="text-white text-lg font-semibold mb-4">Enlaces útiles</h2>
            <ul className="space-y-2">
              <li><a href="/terminos" className="text-gray-300 hover:text-white">Términos y condiciones</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Política de privacidad</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Envíos y devoluciones</a></li>
            </ul>
          </div>

          {/* Contáctanos */}
          <div className="col-span-1">
            <h2 className="text-white text-lg font-semibold mb-4">Contáctanos</h2>
            <p className="text-gray-300">mueblesexpress@gmail.com</p>
            <p className="text-gray-300">Barrio 9 de Julio</p>
            <p className="text-gray-300">Sierra Grande,Rio Negro</p>
          </div>
        </div>
      </div>

      {/* Derechos de autor */}
      <div className="container text-center text-gray-500 py-4">
        &copy; Creado por Carla Faes 2023.
      </div>
    </div>
  );
};

export default Footer;
