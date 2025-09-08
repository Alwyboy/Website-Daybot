import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/oauth2callback", async (req, res) => {
  const code = req.query.code;

  const data = {
    code: code,
    client_id: "124668661699-3c6k0ti21hfvvg3rqvi133v50he0dt2g.apps.googleusercontent.com",
    client_secret: "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",
    redirect_uri: "https://website-daybot-fm1aw4hne-haddatalwi21-3696s-projects.vercel.app",
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
