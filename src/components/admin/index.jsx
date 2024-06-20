import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AuthProvider, { AuthContext } from "../../context/auth";
import AdminNavbar from "./Navbar";
function AdminPage() {
  const [loading, setload] = useState(true);

  const loader = document.getElementById("loader");

  useEffect(() => {
    if (loading)
      setTimeout(() => {
        setload(false);
      }, 3000);
    loader.style.display = loading ? "block" : "none";
  }, [loading]);
  return (
    <AuthProvider>
      <div
        className={`dm-sans-normal -translate-y-5 opacity-0 ${
          !loading && "opacity-100 translate-y-0"
        } transition delay-100`}
      >
        <AdminNavbar />
        <Outlet context={AuthContext} />
      </div>
    </AuthProvider>
  );
}

export default AdminPage;
