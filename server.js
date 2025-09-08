import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/oauth2callback", async (req, res) => {
  const code = req.query.code;

  const data = {
    code: code,
    client_id: "YOUR_CLIENT_ID.apps.googleusercontent.com",
    client_secret: "YOUR_CLIENT_SECRET",
    redirect_uri: "http://localhost:3000/oauth2callback",
    grant_type: "authorization_code"
  };

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(data)
  });

  const tokens = await response.json();
  console.log(tokens); // <- di sini ada refresh_token

  res.send("Token sudah didapat! Cek console server.");
});

app.listen(3000, () => console.log("Server jalan di http://localhost:3000"));
