import React from "react";
import socket from "../../socket";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";

export const SocketContext = React.createContext();

export default function SocketContextProvider() {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const [onlineUsers, setOnlineUsers] = React.useState();
  const [userRoom, setUserRoom] = React.useState();

  console.log("SocketContextProvider component rendered");
  console.log("aa Socket instance created:", socket);

  // Retrieve room id on refresh
  React.useEffect(() => {
    const roomId = window.localStorage.getItem("roomId");
    if (roomId) {
      setUserRoom(roomId);
    }
  }, []);

  React.useEffect(() => {
    if (!user) return; // insufficient check as some user obj properties might be missing
    console.log("Newly logged in user details", user);
    socket.auth = { username: user.username, sub: user.sub, roomId: userRoom };
    try {
      console.log("socket reconnecting...");
      socket.connect();
    } catch (e) {
      console.log(e, e.message);
    }
    return () => {
      socket.disconnect();
    };
  }, [user, isAuthenticated, isLoading, userRoom]);

  // update user list on connect / disconnect
  React.useEffect(() => {
    function handler(users) {
      users.forEach((user) => {
        user.self = user.socketId === socket.id;
      });
      console.log("users", users);
      users = users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });
      setOnlineUsers(users);
    }
    socket.on("users", handler);
    return () => socket.off("users", handler);
  }, []);

  // other user connection event
  React.useEffect(() => {
    function userConnectedHandler(user) {
      const existingUser = onlineUsers.find(
        (i) => i.username === user.username
      );
      if (!existingUser) {
        setOnlineUsers((onlineUsers) => [...onlineUsers, user]);
        console.log("to do: add some notification");
      }
    }
    socket.on("user connected", userConnectedHandler);
    return () => socket.off("user connected", userConnectedHandler);
  }, [onlineUsers]);

  const value = React.useMemo(() => {
    return {
      onlineUsers,
      setOnlineUsers,
    };
  }, [onlineUsers, setOnlineUsers]);

  if (isLoading || !isAuthenticated) return;

  return (
    <SocketContext.Provider value={value}>
      <Outlet />
    </SocketContext.Provider>
  );
}
