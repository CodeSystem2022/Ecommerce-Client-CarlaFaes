import React from "react";
import { Link } from "react-router-dom";

const Pagination = (props) => {
  const { page, pages, keywords = "" } = props;
  console.log(props, "pages props");
  return (
    <>
      paginacion
      {pages >= 1 && (
        <>
          <nav>
            <ul>
              {[...Array(pages).keys()].map((p) => (
                <li
                  key={p + 1}
                  style={{ color: p + 1 === page ? "green" : "black" }}
                >
                  <Link
                    to={
                      keywords
                        ? `/search/${keywords}?page=${p + 1}`
                        : `/page/${p + 1}`
                    }
                  >
                    <p>{p + 1}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </>
  );
};

export default Pagination;
