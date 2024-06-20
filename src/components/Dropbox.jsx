import React, { useState } from "react";

function Dropbox({ id, title, list, setOption, type }) {
  const [drop, setDrop] = useState(false);
  return (
    <div className="h-fit w-46 group" id={id}>
      <button
        className="text-white w-full bg-blue-600 hover:bg-blue-700 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-between items-center "
        type="button"
        onClick={() => setDrop((pre) => !pre)}
      >
        {title}{" "}
        <svg
          className={`w-2.5 h-2.5 ms-3 transition-transform ${
            drop && "rotate-180"
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        className={`z-10 my-2 max-h-0 transition-all overflow-hidden ${
          drop && "max-h-96"
        } bg-blue-50/50 backdrop-blur-lg rounded-lg shadow-md w-44 absolute`}
      >
        <ul className="py-2 text-sm text-gray-70">
          {type === "subject" &&
            list?.map((ele, lid) => (
              <li
                onClick={() => {
                  setDrop(false);
                  setOption(ele);
                }}
                key={lid + "lid"}
              >
                <a
                  href={`/${ele?.link}` || "#"}
                  className="block px-4 py-2 text-black hover:bg-blue-200 transition-colors duration-300  hover:text-blue-600 hover:font-medium"
                >
                  {ele?.name || "Option"}
                </a>
              </li>
            ))}
          {type === "chapter" &&
            list?.map((ele, lid) => (
              <li
                onClick={() => {
                  setDrop(false);
                  setOption((pre) => ({ ...pre, chapter: ele }));
                }}
                key={lid + "chpid"}
              >
                <p className="block px-4 py-2 text-black hover:bg-blue-200 transition-colors duration-300  hover:text-blue-600 hover:font-medium">
                  {ele || "Option"}
                </p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Dropbox;
