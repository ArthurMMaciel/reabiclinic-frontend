import React, { useEffect, useState } from "react";
import logo from "../../img/logo.png";
import { buscarAvisos } from "../../chamadasApi/avisosApi";
import Article from "../../components/Article/Article";

const Home = () => {
  const [avisos, setAvisos] = useState([]);

  useEffect(() => {
    buscarAvisos()
      .then(setAvisos)
      .catch(() => {});
  }, []);

  return (
    <>
      <div className="flex flex-col items-center pt-10 px-4">
        <img alt="Reabi" src={logo} className="h-20 w-auto mb-10" />
        {avisos.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
            {avisos.map((aviso) => (
              <Article key={aviso.id} {...aviso} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
