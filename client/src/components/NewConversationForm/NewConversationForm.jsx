// import React from "react";
// import UserList from "../UserList";
// import UserMultiSelect from "../UserMultiSelect";
// import LoadingSpinner from "../LoadingSpinner";
// import useCreateConversation from "../../hooks/useCreateConversation";
// import { useNavigate } from "react-router-dom";

// export default function NewConversationForm() {
//   const [participants, setParticipants] = React.useState([]);
//   const [conversationName, setConversationName] = React.useState("");
//   const { createConversation, status } = useCreateConversation();
//   const navigate = useNavigate();
//   console.log("NewConversationForm component rendered");

//   async function handleSubmit(e) {
//     e.preventDefault();
//     const convoId = await createConversation(participants, conversationName);
//     navigate(`/conversation/${convoId}`);
//   }

//   function handleSelectUser(selectedUsers) {
//     const participants = selectedUsers.map((i) => {
//       return { name: i.value };
//     });
//     setParticipants(participants);
//   }

//   function handleNameChange(e) {
//     setConversationName(e.target.value);
//   }

//   if (status.isLoading) {
//     return <LoadingSpinner />;
//   }

//   if (status.isError) {
//     return <div>Error creating conversation</div>;
//   }

//   return (
//     <div>
//       <UserList />
//       <h2>New Conversation Form</h2>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="convoName" id="convoName">
//           Name
//         </label>
//         <input
//           type="text"
//           id="convoName"
//           name="convoName"
//           onChange={handleNameChange}
//         ></input>
//         <UserMultiSelect name="users" handleSelectUser={handleSelectUser} />
//         <button>submit</button>
//       </form>
//     </div>
//   );
// }
