import express from "express";
import cors from "cors";
import { setupWebSocket } from "./websocket.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/webauthn/login/options", (req, res) => {
  res.json({ challenge: "dummy-login-challenge" });
});

app.post("/webauthn/login/verify", (req, res) => {
  res.json({ success: true, userId: "user123" });
});

const server = app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});

setupWebSocket(server);