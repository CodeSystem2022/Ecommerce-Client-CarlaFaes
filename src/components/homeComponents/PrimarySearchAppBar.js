import * as React from "react";
import { useNavigate } from "react-router-dom";
import { FcSearch } from "react-icons/fc";
import { listProduct, sortProducts } from "../../Redux/Actions/ProductActions";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";


export default function PrimarySearchAppBar({
  onSortByName,
  onSortByPrice,
}) {
  const [keyword, setKeyword] = React.useState("");
  let history = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const keywordString = keyword ? keyword.toString().trim() : "";
    const url = `/search/${encodeURIComponent(keywordString)}`;

    if (keywordString) {
      history(url);
    } else {
      history("/");
    }
  };

  const handleSort = async(sortBy, sortOrder) => {
    // Lógica para definir sortOptions según el botón u opción seleccionada
    const sortOptions = {
      sortBy,
      sortOrder,
    };
    console.log(sortOptions,'se ejecuta handle');
    try{
      await dispatch(sortProducts(sortOptions));
    }
    catch(error){
      console.log("Error de handle sort".error);
    }

    // if (sortBy === "name") {
    //   onSortByName && onSortByName();
    // } else if (sortBy === "price") {
    //   onSortByPrice && onSortByPrice();
    // }
  };


  return (
    <>
      <div className="h-full w-full border-t bg-primary mt-0 p-2">
        <div className="container text-center text-gray-500 py-4">
        <div className="px-1">
          <form
            onSubmit={submitHandler}
            className="text-xl hover:text-gray-800 flex flex-row-reverse"
          >
            <button
              className="bg-stone-200 border-opacity-50 border-gray-700 hover:border-secondary hover:bg-slate-300  font-semibold rounded-full   text-secondary p-3"
              type="submit"
            >
              <FcSearch className="top-0 right-0 text-2xl" />
            </button>
            <input
              type="search"
              placeholder="Busca un producto..."
              onChange={(e) => setKeyword(e.target.value)}
              className="focus:ring-2 focus:ring-secondary focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 px-2 ring-1 ring-slate-200 shadow-sm"
            />
          </form>
          </div>
          <div className="py-1 text-slate-400 tetx-lg font-semibold" >Filtrar busqueda</div>
          <div>
          <h4 className="py-1 text-slate-400">Ordenar por nombres</h4>
            {/* Ejemplo de botones de ordenamiento */}
            <div>
            <Button variant="contained" className=" w-full border border-solid p-2 border-secondary rounded-lg  py-2 mb-4 font-normal font-[Poppins] text-lg leading-none" onClick={() => handleSort("name", "asc")}>
              Ordenar A-Z
            </Button>
            </div>
            <div className="my-2">
            <Button variant="contained" className="border border-solid p-2 border-secondary rounded-lg w-full py-2 mb-4 font-normal font-[Poppins] text-lg leading-none text-secondary" onClick={() => handleSort("name", "desc")}>
              Ordenar Z-A
            </Button>
            </div>
          </div>

          <div>
            <h4 className="py-1 text-slate-400">Ordenar por precio</h4>
            {/* Ejemplo de botones de ordenamiento */}
            <div  className="my-2">
            <Button variant="contained"  onClick={() => handleSort("price", "asc")}>
            Ordenar Precios de Menor a Mayor
            </Button>
            </div>
            <div className="my-2">
            <Button variant="contained"  onClick={() => handleSort("price", "desc")}>
            Ordenar Precios de Mayor a Menor
            </Button>
            </div>
          </div>
       
        </div>
      </div>
    </>
  );
}
