import { useState } from "react";
import Login from "./Login";
import Chat from "./Chat";

export default function App() {
  const [user, setUser] = useState(null);

  function handleLogout() {
    setUser(null);
  }

  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f5f6fa",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 20
    }}>
      <div style={{
        width: "100%",
        maxWidth: 500,
        backgroundColor: "#fff",
        borderRadius: 12,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        padding: 30
      }}>
        {user
          ? <Chat user={user} onLogout={handleLogout} />
          : <Login onLogin={setUser} />
        }
      </div>
    </div>
  );
}