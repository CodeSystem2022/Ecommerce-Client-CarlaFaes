import React from "react";
import { Link } from "react-router-dom";

const Pagination = (props) => {
  const { page, pages, keywords = "" } = props;
  return (
    <>
      {pages >= 1 && (
        <>
          <nav >
            <ul className="flex flex-row gap-3 justify-center  text-secondary p-5 w-full left-0">
              {[...Array(pages).keys()].map((p) => (
                <li
                  key={p + 1}
                  style={{ color: p + 1 === page ? "text-secondary" : "gray" }}
                  className="hover:bg-slate-500 hover:border-secondary p-2 rounded-md bg-primary  border border-solid"
                >
                  <Link
                  
                    to={
                      keywords
                        ? `/search/${keywords}?page=${p + 1}`
                        : `/page/${p + 1}`
                    }
                  >
                    <p className="font-bold">{p + 1}</p>
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
