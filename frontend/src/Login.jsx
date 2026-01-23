import { getLoginOptions, verifyLogin } from "./api";

export default function Login({ onLogin }) {

  async function handleLogin() {
    const options = await getLoginOptions();
    console.log("WebAuthn options:", options);

    const dummyAssertion = { credential: "dummy" };
    const result = await verifyLogin(dummyAssertion);

    if (result.success) {
      // Generate a random ID for this session
      const randomId = "user-" + Math.floor(Math.random() * 10000);
      onLogin({ id: randomId, name: randomId });
    }
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ color: "#2f3640", marginBottom: 20 }}>Passwordless Login</h2>
      <button
        onClick={handleLogin}
        style={{
          backgroundColor: "#4cd137",
          color: "#fff",
          border: "none",
          padding: "12px 24px",
          fontSize: 16,
          borderRadius: 8,
          cursor: "pointer",
          transition: "all 0.2s"
        }}
        onMouseOver={e => e.currentTarget.style.backgroundColor = "#44bd32"}
        onMouseOut={e => e.currentTarget.style.backgroundColor = "#4cd137"}
      >
        Login with WebAuthn
      </button>
    </div>
  );
}