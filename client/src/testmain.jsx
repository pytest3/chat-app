// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import ProfilePage from "./pages/ProfilePage";
// import LandingPage from "./pages/LandingPage";
// import Auth0ProviderLayout from "./pages/Auth0ProviderLayout";
// import PageLayout from "./pages/PageLayout";
// import SessionPage from "./pages/SessionPage";
// import Conversation from "./components/Conversation";
// import SocketContextProvider from "./components/SocketContextProvider/SocketContextProvider";
// import HomePage from "./pages/HomePage";

// const router = createBrowserRouter([
//   {
//     element: <Auth0ProviderLayout />,
//     children: [
//       {
//         path: "/",
//         element: <LandingPage />,
//       },
//       {
//         element: <SocketContextProvider />,
//         children: [
//           {
//             path: "home",
//             element: <PageLayout />,
//             children: [
//               { index: true, element: <HomePage /> }, // contains UserList
//               { path: "profile", element: <ProfilePage /> },
//               { path: "session", element: <SessionPage /> },
//             ],
//           },
//           {
//             path: "chat/:convoId",
//             element: <Conversation></Conversation>,
//           },
//         ],
//       },
//     ],
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router}></RouterProvider>
//   </React.StrictMode>
// );
