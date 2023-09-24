import React from "react";

const CallToActionSection = () => {
  return (
    <div className="subscribe-section bg-with-black">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="subscribe-head">
              <h2>Queres mantenerte actualizado?</h2>
              <p>Siguenos y obten las ultimas novedades</p>
              <form className="form-section">
                <input
                  placeholder="Tu correo electronico.."
                  name="email"
                  type="email"
                />
                <input value="suscripcion" name="subscribe" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CallToActionSection;
