import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Contacts from "./Contacts.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";

const backendLink =
  "https://contact-management-web-app-backend-nv0o.onrender.com";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App backendLink={backendLink} />,
  },
  {
    path: "/contacts",
    element: <Contacts backendLink={backendLink} />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
