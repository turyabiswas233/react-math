import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage.jsx";
import ErrorAdmin from "./components/admin/ErrorAdmin.jsx";
import AdminPage from "./components/admin/index.jsx";
import AccountPage from "./components/admin/account/index.jsx";
import AdminHome from "./components/admin/Home.jsx";
import Dashboard from "./components/admin/dashboard/index.jsx";
import Question from "./components/admin/dashboard/question/index.jsx";
const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
    errorElement: <ErrorAdmin />,

    children: [
      {
        index: true,
        element: <AdminHome />,
      },
      {
        path: "account",
        element: <AccountPage />,
      },
      {
        path: "a_dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "a_ques",
            element: <Question />,
          },
          {
            path: "a_course",
            element: <Question />,
          },
          {
            path: "a_exam",
            element: <Question />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routerConfig} />
  </React.StrictMode>
);
