import React, { useEffect, useState } from "react";
import { MdLogin, MdAccountCircle, MdDashboard } from "react-icons/md";

import logo from "/swiftcrab.svg";
import { auth } from "../../context/fb";
import { useAuth } from "../../context/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";

function AdminNavbar() {
  const { user, loading } = useAuth();

  const locate = useLocation();

  const navigate = useNavigate();
  const Loading = () => {
    return (
      <div className="border-4 border-blue-400/50 border-t-blue-500 w-2 h-2 rounded-full p-3 animate-spin "></div>
    );
  };
  useEffect(() => {
    if (!loading && !user) navigate("/admin/account");
  }, [loading, user]);
  if (locate.pathname.includes("a_dashboard")) return;
  return (
    <nav
      className={`w-full h-fit text-black font-medium sticky top-0 left-0 z-50 transform-gpu shadow-md shadow-slate-400/50 bg-white`}
    >
      <div className="navbar w-full max-w-4xl xl:max-w-6xl  mx-auto">
        <div className="navbar-start">
          <button className="btn bg-blue-600 text-white border-none scale-75 md:scale-90 xl:scale-100">
            <p className="inline-flex h-fit text-lg xl:text-xl items-center gap-1 justify-center">
              <img src={logo} className="object-cover px-2" width={50} alt="" />{" "}
              Swiftcrab
            </p>
          </button>
        </div>
        <div className="navbar-end text-blue-500 space- xl:max-w-6xl x-1">
          {loading ? (
            <Loading size={3} />
          ) : user ? (
            <>
              <Link
                className="btn btn-ghost p-2 hover:bg-blue-600 hover:text-blue-50  "
                to={"/admin/a_dashboard"}
              >
                <MdDashboard size={20} />{" "}
                <span className="hidden md:inline-block">Dashboard</span>
              </Link>
              <Link
                className="flex items-center gap-1 btn btn-ghost p-2 hover:bg-blue-600 hover:text-blue-50"
                to={"/admin/a_profile"}
              >
                <MdAccountCircle size={20} />
                <span className="hidden md:inline-block">Profile</span>
              </Link>
              <button
                className="btn btn-ghost p-2 hover:bg-blue-600 hover:text-blue-50"
                onClick={() => {
                  auth.signOut();
                }}
              >
                <MdLogin size={20} />{" "}
                <span className="hidden md:inline-block">Logout</span>
              </button>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
