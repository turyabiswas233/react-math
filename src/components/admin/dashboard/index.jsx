import React, { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import logo from "/swiftcrab.svg";
import { MdClose, MdMenu } from "react-icons/md";
function Dashboard() {
  const adminLink = [
    {
      title: "Course",
      link: "a_dashboard/a_course",
    },
    {
      title: "Student",
      link: "a_dashboard/a_link",
    },
    {
      title: "Question",
      link: "a_dashboard/a_ques",
    },
    {
      title: "Exam",
      link: "a_dashboard/a_exam",
    },
    {
      title: "Student's Query",
      link: "a_dashboard/a_quest",
    },
  ];
  const [show, setshow] = useState(false);
  const { pathname } = useLocation();
  return (
    <div className="h-svh w-full bg-white text-black poppins-bold overflow-x-hidden flex flex-row relative ">
      <div className="px-1 lg:p-0">
        <button
          className="bg-blue-50 p-4 rounded-md  text-blue-600 z-50 absolute right-6 top-1 my-2 lg:hidden"
          onClick={() => {
            setshow((pre) => !pre);
          }}
        >
          {!show ? <MdMenu size={20} /> : <MdClose size={20} />}
        </button>
        <SidePanel
          links={adminLink}
          show={show}
          hideMenu={() => setshow(false)}
        />
      </div>
      {(pathname === "/admin/a_dashboard" ||
        pathname === "/admin/a_dashboard/") && (
        <div className="m-20 flex w-full justify-center h-fit">
          <h2 className=" text-center text-5xl">
            Welcome to Swiftcrab Dashboard
          </h2>
        </div>
      )}
      <Outlet />
    </div>
  );
}
const SidePanel = ({ links, show, hideMenu }) => {
  return (
    <div
      className={` bg-slate-800 shadow-md text-slate-100 flex flex-col py-4 h-screen absolute z-10 lg:static top-0 left-0 ${
        !show
          ? "-translate-x-full "
          : "translate-x-0  shadow-lg w-svw pt-20 lg:w-fit "
      }  transition-transform lg:translate-x-0`}
    >
      <Link
        className="bg-blue-600  text-white border-none px-3 lg:px-14 inline-flex py-3 mb-14"
        to={"/admin"}
      >
        <p className="inline-flex h-fit text-lg xl:text-xl items-center gap-1 justify-center">
          <img src={logo} className="object-cover px-2" width={50} alt="" />{" "}
          Swiftcrab
        </p>
      </Link>
      {links.map((ele) => (
        <NavLink
          className="bg-transparent hover:bg-white/10 px-5 py-3 transition-colors"
          key={ele.title}
          to={`/admin/${ele.link}`}
          onClick={hideMenu}
        >
          {ele.title}
        </NavLink>
      ))}
    </div>
  );
};
export default Dashboard;
