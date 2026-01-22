import { WebSocketServer } from "ws";

export function setupWebSocket(server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    ws.on("message", (data) => {
      wss.clients.forEach(client => {
        if (client.readyState === ws.OPEN) {
          client.send(data.toString());
        }
      });
    });
  });
}