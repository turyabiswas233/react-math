import React from "react";
import { Outlet } from "react-router-dom";
import AuthProvider, { AuthContext } from "../../context/auth";
import AdminNavbar from "./Navbar";
function AdminPage() {
  return (
    <AuthProvider>
      <div>
        <AdminNavbar />
        <Outlet context={AuthContext} />
      </div>
    </AuthProvider>
  );
}

export default AdminPage;
