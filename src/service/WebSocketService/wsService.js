// import io from "socket.io-client";

// const connectWebService = (setMessage, setBroadcastMessage, setNewMessage, setProblemStatementDisabled, setWorkshopAreaDisabled, setWorkingMaterialDisabled) => {
//   const socket = io(process.env.REACT_APP_SOCKET_SERVER_URL);

//   socket.on("connect", () => {
//     console.log("Connected to server:", socket.id);
//   });


//   socket.on("disableProblemStatement", () => {
//     setProblemStatementDisabled(true);
//   });

//   socket.on("enableProblemStatement", () => {
//     setProblemStatementDisabled(false);
//     console.log("hello");
//   });

//   socket.on("disableWorkshopArea", () => {
//     setWorkshopAreaDisabled(true);
//   });

//   socket.on("enableWorkshopArea", () => {
//     setWorkshopAreaDisabled(false);
//   });

//   socket.on("disableWorkingMaterial", () => {
//     setWorkingMaterialDisabled(true);
//   });

//   socket.on("enableWorkingMaterial", () => {
//     setWorkingMaterialDisabled(false);
//   });

//   socket.on("messageFromServer", (data) => {
//     console.log("Message from server:", data.message);
//     setMessage(data.message);
//   });

//   socket.on("broadcastMessage", (data) => {
//     console.log("Broadcast message:", data.message);
//     setBroadcastMessage(data.message);
//   });

//   socket.on("newMessage", (data) => {
//     console.log("New message:", data.message);
//     setNewMessage(data.message);
//   });

//   socket.on("disconnect", () => {
//     console.log("Disconnected from server");
//   });

//   return socket; // Optionally return the socket object for external management
// }

// export default connectWebService;
