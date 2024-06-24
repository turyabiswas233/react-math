import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

/* DONT TOUCH IT */
function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar w-full bg-blue-200/50 backdrop-blur text-black font-medium rounded-b-xl p-2 sticky top-0 left-0 z-50 transform-gpu shadow-md shadow-slate-400/50 ">
      <div className="navbar-start ">
        <button className="btn btn-primary">Logo</button>
      </div>
      <ul className="navbar-center flex gap-5">
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

      <div className="navbar-end space-x-2 ">
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
