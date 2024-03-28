import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import LandingPage from "./pages/LandingPage";
import Auth0ProviderLayout from "./pages/Auth0ProviderLayout";
import PageLayout from "./pages/PageLayout";
import SessionPage from "./pages/SessionPage";
import Conversation from "./components/Conversation";
import SocketContextProvider from "./components/SocketContextProvider";
import HomePage from "./pages/HomePage";
import AuthenticationGuard from "./components/AuthenticationGuard";
import CurrentUserContextProvider from "./components/CurrentUserContextProvider";

const router = createBrowserRouter([
  {
    element: <Auth0ProviderLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        element: <AuthenticationGuard />,
        children: [
          {
            element: <SocketContextProvider />,
            children: [
              {
                element: <CurrentUserContextProvider />,
                children: [
                  {
                    path: "/login",
                    element: <PageLayout />,
                    children: [
                      {
                        index: true,
                        element: <Navigate to="/login/home" replace />,
                      },
                      { path: "home", element: <HomePage /> }, // contains UserList
                      { path: "profile", element: <ProfilePage /> },
                      { path: "session", element: <SessionPage /> },
                      // {
                      //   path: "all-conversations",
                      //   element: <ConversationsPageLayout />,
                      //   children: [{ index: true, element: <ConversationList /> }],
                      // },
                    ],
                  },
                  { path: "conversation/:convoId", element: <Conversation /> },
                ],
              },
            ],
          },
        ],
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
