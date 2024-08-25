import { useEffect, useState } from "react";

const createConnection = (roomId: string) => {
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room');
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room');
    },
  };
};

interface ChatRoomProps {
  roomId: string;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ roomId }) => {
  useEffect(() => {
    console.log("✅ Mount <ChatRoom />");
    return () => {
      console.log("❌ Unmounting <ChatRoom />...");
    };
  }, []);

  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);
  return <h1>Welcome to the {roomId} room!</h1>;
};

const App = () => {
  const [roomId, setRoomId] = useState("general");
  const [show, setShow] = useState(false);
  return (
    <>
      <label>
        Choose the chat room:
        <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <button onClick={() => setShow(!show)}>
        {show ? "Close chat" : "Open chat"}
      </button>
      {show && <hr />}
      {show && <ChatRoom roomId={roomId} />}
    </>
  );
};

export default App;
