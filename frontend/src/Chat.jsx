import { useEffect, useState } from "react";

export default function Chat({ user, onLogout }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [ws, setWs] = useState(null);

  // Connect to WebSocket
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:4000");

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setMessages(msgs => [...msgs, msg]);
    };

    setWs(socket);
    return () => socket.close();
  }, []);

  // Get HH:MM timestamp
  function getTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  // Send message with sender ID
  function sendMessage() {
    if (ws && text.trim() !== "") {
      const message = {
        text,
        time: getTime(),
        sender: user.id,
        name: user.id // For now, use id as name
      };

      ws.send(JSON.stringify(message));
      setText("");
    }
  }

  // Logout handler
  function handleLogout() {
    if (ws) ws.close();
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

        {messages.map((msg, i) => {
          const isMe = msg.sender === user.id;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: isMe ? "flex-end" : "flex-start",
                marginBottom: 12
              }}
            >
              {/* Show sender name only for others */}
              {!isMe && (
                <div style={{
                  fontSize: 12,
                  color: "#2f3640",
                  marginBottom: 2,
                  fontWeight: "bold"
                }}>
                  {msg.name}
                </div>
              )}

              <div
                style={{
                  backgroundColor: isMe ? "#40739e" : "#44bd32",
                  color: "#fff",
                  padding: "8px 12px",
                  borderRadius: 8,
                  maxWidth: "75%",
                  wordBreak: "break-word"
                }}
              >
                {msg.text}
              </div>

              <div
                style={{
                  fontSize: 11,
                  color: "#636e72",
                  marginTop: 3,
                  marginRight: isMe ? 6 : 0,
                  marginLeft: isMe ? 0 : 6
                }}
              >
                {msg.time}
              </div>
            </div>
          );
        })}
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