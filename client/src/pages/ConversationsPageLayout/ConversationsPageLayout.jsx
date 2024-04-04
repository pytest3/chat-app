// import React, { useContext } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
// import { Link, Outlet } from "react-router-dom";
// import LoadingSpinner from "../../components/LoadingSpinner";
// import socket from "../../socket";
// import { SocketContext } from "../../components/SocketContextProvider/SocketContextProvider";

// export default function ConversationsPageLayout() {
// React.useEffect(() => {
//   if (!isAuthenticated || isLoading) return;
//   function errorHandler(e) {
//     console.log(e);
//   }
//   socket.auth = { name: user.username, userId: user.sub };
//   console.log("conversationPageLayout effect ran", socket.id);
//   socket.connect();
//   socket.on("connect_error", errorHandler);
//   return () => {g
//     socket.off("connect_error", errorHandler);
//     socket.disconnect();
//   };
// }, [user, isAuthenticated, isLoading]);

// React.useEffect(() => {
//   if (!user) return;
//   socket.emit("new user", { name: user.username, userId: user.sub });
//   return () => console.log("new user clean up effect ran");
// }, [user]);

//   return (
//     <div>
//       <Outlet />
//     </div>
//   );
// }
