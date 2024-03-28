import { io } from "socket.io-client";

const URL = import.meta.env.VITE_BACKEND_URL;

// create a socket and supply Socket IO server URL for it to connect to
const socket = io(URL, { autoConnect: false });

export default socket;
