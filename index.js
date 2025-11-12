const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// Apne sabhi bot tokens yahan daalo
const BOT_TOKENS = [
  "TOKEN_1",
  "TOKEN_2",
  "TOKEN_3"
];

// Default chat_id (channel/group/user)
const CHAT_ID = "@yourchannel_or_userid";

// Simple API route
app.post("/broadcast", async (req, res) => {
  const message = req.body.message || "Default broadcast message!";
  let results = [];

  for (const token of BOT_TOKENS) {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    try {
      const response = await axios.post(url, {
        chat_id: CHAT_ID,
        text: message
      });
      results.push({ token, status: "sent", data: response.data });
    } catch (error) {
      results.push({ token, status: "error", error: error.message });
    }
  }

  res.json({ results });
});

module.exports = app;
