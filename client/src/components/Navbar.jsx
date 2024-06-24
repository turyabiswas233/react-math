import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

/* DONT TOUCH IT */
function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="grid grid-cols-2 md:grid-cols-3 items-center w-full bg-blue-200/50 backdrop-blur text-black font-medium rounded-b-xl p-2 sticky top-0 left-0 z-50 transform-gpu shadow-md shadow-slate-400/50 text-xs ">
      <div className="scale-75">
        <button className="btn btn-primary">Logo</button>
      </div>
      <ul className="md:flex gap-5 hidden">
        <li className="hover:underline cursor-pointer underline-offset-4">
          <NavLink className={"px-4 py-2 rounded-md"} to={"/"}>
            Home
          </NavLink>
        </li>
        <li className="hover:underline cursor-pointer underline-offset-4">
          <NavLink className={"px-4 py-2 rounded-md"} to={"/about"}>
            About
          </NavLink>
        </li>
        <li className="hover:underline cursor-pointer underline-offset-4">
          <NavLink className={"px-4 py-2 rounded-md"} to={"/contact"}>
            Contact
          </NavLink>
        </li>
      </ul>

      <div className="space-x-2 scale-75">
        <button
          className="btn btn-ghost"
          onClick={() => {
            navigate("/admin");
          }}
        >
          Admin
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
