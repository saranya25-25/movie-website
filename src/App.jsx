// import { useState, useEffect } from "react";

import { createBrowserRouter,RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
function App() {

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/wishlist",
        element: <Wishlist />
      },
      {
        path: "/profile",
        element: <Profile />
      }
    ],
    {
      basename: "/movie-website"
    }
  );

  return (
    <RouterProvider router={router} />
  );
}

export default App;