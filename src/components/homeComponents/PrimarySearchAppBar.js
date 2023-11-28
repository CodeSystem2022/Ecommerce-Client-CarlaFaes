import * as React from "react";
import { useNavigate } from "react-router-dom";
import { FcSearch } from "react-icons/fc";
import { listProduct, sortProducts } from "../../Redux/Actions/ProductActions";
import { useDispatch, useSelector } from "react-redux";

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
      <div className="h-full border-t bg-primary mt-0">
        <div className="container text-center text-gray-500 py-4">
          <div>filtros de bsuqueda</div>
          <div>
            {/* Ejemplo de botones de ordenamiento */}
            <button className="bg-stone-300 text-blue-900 p-2 border border-stone-600" onClick={() => handleSort("name", "asc")}>
              Ordenar A-Z
            </button>
            <button className="bg-stone-300 text-blue-900 p-2 border border-stone-600" onClick={() => handleSort("name", "desc")}>
              Ordenar Z-A
            </button>
          </div>

          <div>
            {/* Ejemplo de botones de ordenamiento */}
            <button className="bg-stone-300 text-blue-900 p-2 border border-stone-600" onClick={() => handleSort("price", "asc")}>
              Ordenar Mayor Precio
            </button>
            <button className="bg-stone-300 text-blue-900 p-2 border border-stone-600" onClick={() => handleSort("price", "desc")}>
              Ordenar Menor precio
            </button>
          </div>
          <form
            onSubmit={submitHandler}
            className="text-xl hover:text-gray-800 flex flex-row-reverse"
          >
            <button
              className=" hover:border-secondary hover:bg-slate-300  font-semibold rounded-full   text-secondary p-3"
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

          <div>{}</div>
        </div>
      </div>
    </>
  );
}
