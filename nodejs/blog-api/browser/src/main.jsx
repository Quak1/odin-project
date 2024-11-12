import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { API_URL } from "./config/constant.js";
import Browser from "./pages/Browser.jsx";
import Post from "./pages/Post.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Browser />,
      },
      {
        path: "tags/:tag",
        element: <Browser />,
      },
      {
        path: "posts/:postId",
        element: <Post />,
        loader: async ({ params }) => {
          const url = `${API_URL}/posts/${params.postId}`;
          const res = await fetch(url);
          if (res.status === 404) throw new Error("Not found");
          if (!res.ok) throw new Error();
          return res;
        },
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
