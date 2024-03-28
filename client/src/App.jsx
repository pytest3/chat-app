// import "./App.css";
// import { useAuth0 } from "@auth0/auth0-react";
// import ProfilePage from "./pages/ProfilePage";
// import useSendUserToServer from "./hooks/useSendUserToServer";

// function App() {
//   const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
//     useAuth0();
//   const sendUserToBackend = useSendUserToServer();

//   async function handleClick() {
//     await loginWithRedirect();
//     await sendUserToBackend();
//     console.log("sending button pressed");
//   }

//   function Button(props) {
//     return <button {...props}></button>;
//   }

//   return (
//     <>
//       <h1>Chat app</h1>
//       <Button onClick={handleClick}>Login</Button>
//       <Button
//         onClick={() =>
//           logout({ logoutParams: { returnTo: window.location.origin } })
//         }
//       >
//         Logout
//       </Button>
//       <ProfilePage />
//     </>
//   );
// }

// export default App;
