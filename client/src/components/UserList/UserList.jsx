import React from "react";
import { SocketContext } from "../SocketContextProvider/SocketContextProvider";
import useCreateConversation from "../../hooks/useCreateConversation.jsx";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import socket from "../../socket.js";

const UserList = React.memo(function UserList() {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth0();
  const { onlineUsers } = React.useContext(SocketContext);
  const { createConversation, status } = useCreateConversation();
  console.log("UserList component rendered claire", onlineUsers);

  async function handleClick(selectedPerson) {
    const convoId = await createConversation(selectedPerson);
    window.localStorage.setItem(
      "selected-user",
      JSON.stringify(selectedPerson)
    );
    console.log("joining", convoId);
    socket.emit("join", { roomId: convoId });
    navigate(`/conversation/${convoId}`);
  }

  if (!onlineUsers) {
    return;
  }

  if (onlineUsers.length < 1) {
    return <div>No users</div>;
  }

  if (status.isLoading) {
    return <LoadingSpinner />;
  }

  if (status.isError) {
    return <div>Unable to create conversation</div>;
  }

  return (
    <>
      <h2>Online users</h2>
      <ul>
        {onlineUsers.map((user) => {
          const { username, socketId, sub } = user;
          return (
            <li key={socketId}>
              <div
                onClick={() => {
                  handleClick({ username, socketId, sub });
                }}
              >
                {username === currentUser.username
                  ? `${username} (yourself)`
                  : username}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
});

export default UserList;
