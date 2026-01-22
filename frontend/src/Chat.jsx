import { useEffect, useState } from "react";

export default function Chat({ user, onLogout }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:4000");

    socket.onmessage = (event) => {
      setMessages(msgs => [...msgs, event.data]);
    };

    setWs(socket);

    return () => socket.close();
  }, []);

  function sendMessage() {
    if (ws && text.trim() !== "") {
      ws.send(text);
      setText("");
    }
  }

  function handleLogout() {
    if (ws) {
      ws.close();
    }
    onLogout();
  }

  return (
    <div>
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15
      }}>
        <h2 style={{ margin: 0, color: "#2f3640" }}>Secure Chat</h2>

        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#e84118",
            color: "#fff",
            border: "none",
            padding: "6px 12px",
            fontSize: 13,
            borderRadius: 6,
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>

      {/* Messages */}
      <div style={{
        border: "1px solid #dcdde1",
        height: 300,
        overflowY: "auto",
        padding: 15,
        marginBottom: 15,
        borderRadius: 8,
        backgroundColor: "#f1f2f6"
      }}>
        {messages.length === 0 && (
          <div style={{ color: "#718093", textAlign: "center", marginTop: 50 }}>
            No messages yet. Start the conversation!
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} style={{
            backgroundColor: "#44bd32",
            color: "#fff",
            padding: "8px 12px",
            marginBottom: 8,
            borderRadius: 6,
            maxWidth: "80%"
          }}>
            {msg}
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ display: "flex", gap: 10 }}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #dcdde1"
          }}
          onKeyPress={e => { if (e.key === "Enter") sendMessage(); }}
        />
        <button
          onClick={sendMessage}
          style={{
            backgroundColor: "#40739e",
            color: "#fff",
            border: "none",
            padding: "10px 16px",
            borderRadius: 8,
            cursor: "pointer"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}