const API_URL = "http://localhost:4000";

export async function getLoginOptions() {
  const res = await fetch(`${API_URL}/webauthn/login/options`, {
    method: "POST"
  });
  return res.json();
}

export async function verifyLogin(assertion) {
  const res = await fetch(`${API_URL}/webauthn/login/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(assertion)
  });
  return res.json();
}