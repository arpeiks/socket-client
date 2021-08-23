import "./index.css";
import React from "react";
import axios from "axios";
import io from "socket.io-client";

function App() {
  const [text, setText] = React.useState("");

  const socket = io("http://localhost:8000", {
    autoConnect: false,
    transports: ["websocket"],
  });

  React.useEffect(() => {
    socket.on("notify", (data: any) => {
      console.log(data);
    });
  }, [socket, text]);

  const start = () => {
    if (!text.length) return;
    socket.auth = { userId: text };
    socket.connect();
  };

  const connect = async () => {
    await axios.get(`http://localhost:8000?id=${text}`);
  };

  return (
    <div>
      <textarea onChange={(e) => setText(e.target.value)} />
      <button onClick={start}>START</button>
      <button onClick={connect}>CONNECT</button>
    </div>
  );
}

export default App;
