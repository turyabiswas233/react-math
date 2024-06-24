import React from "react";
import { NavLink } from "react-router-dom";

function AdminHome() {
  return (
    <div className="container text-white p-10 w-full mx-auto grid justify-center items-center flex-col text-center">
      <h2 className="stat-title text-5xl my-10">Admin Page</h2>
      <div className="mt-20 space-y-6">
        <p className="text-3xl text-blue-300">
          Welcome to Swiftcrab Admin Panel
        </p>
        <p className="text-lg">
          You have to{" "}
          <NavLink className={"link-primary text-2xl"} to="/admin/account">
            login
          </NavLink>{" "}
          to control over Swiftcrab admin.
        </p>
      </div>
    </div>
  );
}

export default AdminHome;
