import React from "react";
import { SocketContext } from "../SocketContextProvider/SocketContextProvider";
import useCreateConversation from "../../hooks/useCreateConversation.jsx";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import socket from "../../socket.js";
import useFetchAllUsers from "../../hooks/useFetchAllUsers.jsx";

const UserList = React.memo(function UserList() {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth0();
  const { onlineUsers } = React.useContext(SocketContext);
  const { createConversation, status } = useCreateConversation();
  const { allUsers } = useFetchAllUsers();
  const onlineUsersAuthIds = onlineUsers.map((i) => i.sub);

  console.log("UserList component rendered", onlineUsers);
  console.log("aa Socket instance in userlist:", socket);

  async function handleClick(selectedPerson) {
    const convoId = await createConversation(selectedPerson);
    window.localStorage.setItem(
      "selected-user",
      JSON.stringify(selectedPerson)
    );
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
              <div>{JSON.stringify(user, null, 4)}</div>
            </li>
          );
        })}
      </ul>
      <h2>Offline users</h2>
      {/* <div>++++++online users +++++</div>
      {JSON.stringify(onlineUsers, null, 4)}
      <div>++++++all users +++++</div>
      {JSON.stringify(allUsers, null, 4)} */}
      {allUsers
        .filter((i) => !onlineUsersAuthIds.includes(i.auth0_id))
        .map((user) => {
          return (
            <li
              key={user.id}
              onClick={() => {
                handleClick({
                  username: user.name,
                  // TODO remove socketId as not used
                  socketId: "",
                  sub: user.auth0_id,
                });
              }}
            >
              {user.name}
            </li>
          );
        })}
    </>
  );
});

export default UserList;
