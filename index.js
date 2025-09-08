const express = require("express");
const axios = require("axios");
const qs = require("querystring");

const app = express();
const port = 3000;

// ---- Ganti sesuai Google Cloud ----
const CLIENT_ID = "YOUR_CLIENT_ID";
const CLIENT_SECRET = "YOUR_CLIENT_SECRET";
const REDIRECT_URI = "http://localhost:3000/callback";
const SCOPE = "https://www.googleapis.com/auth/youtube.readonly";

// 1. Endpoint awal -> arahkan user ke Google OAuth
app.get("/", (req, res) => {
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${qs.stringify({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: SCOPE,
    access_type: "offline",
    prompt: "consent",
  })}`;
  res.send(`<a href="${authUrl}">Login with Google</a>`);
});

// 2. Callback dari Google -> tukar code jadi access_token
app.get("/callback", async (req, res) => {
  const code = req.query.code;
  try {
    const response = await axios.post(
      "https://oauth2.googleapis.com/token",
      qs.stringify({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const tokens = response.data;
    console.log("Tokens:", tokens);

    res.send(`
      <h1>Access Token Diterima ✅</h1>
      <pre>${JSON.stringify(tokens, null, 2)}</pre>
    `);
  } catch (err) {
    res.send("Error: " + err.message);
  }
});

app.listen(port, () => {
  console.log(`Server jalan di http://localhost:${port}`);
});
