import React from "react";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";

const TermsAndConditions = () => {
  return (
    <Container>
      <Box sx={{ bgcolor: "#b3c5cd", height: "100vh" }}>
        <div className="container py-8 h-full">
          <h1 className="text-2xl font-semibold mb-4">
            Términos y Condiciones
          </h1>

          <p className="mb-4">
            Bienvenido a Muebles Express, operado por Carla Faes. Al
            acceder y utilizar este sitio web, aceptas cumplir con estos
            términos y condiciones de uso. Por favor, lee detenidamente.
          </p>

          <h2 className="text-lg font-semibold mb-2">1. Uso del Sitio</h2>
          <p className="mb-4">
            El uso de este sitio web está sujeto a las siguientes condiciones de
            uso: El contenido de las páginas de este sitio web es solo para tu
            información general y está sujeto a cambios sin previo aviso.
          </p>

          <h2 className="text-lg font-semibold mb-2">2. Compras</h2>
          <p className="mb-4">
            Al realizar una compra en nuestro sitio, aceptas proporcionar
            información precisa y completa sobre ti mismo. Nos reservamos el
            derecho de rechazar o cancelar tu pedido por cualquier motivo,
            incluyendo la violación de estos términos y condiciones.
          </p>

          {/* Agrega más secciones según sea necesario... */}

          <h2 className="text-lg font-semibold mb-2">Contacto</h2>
          <p>
            Si tienes alguna pregunta sobre estos términos y condiciones, por
            favor contáctanos en info@mueblesexpress.com.
          </p>
        </div>
      </Box>
    </Container>
  );
};

export default TermsAndConditions;
