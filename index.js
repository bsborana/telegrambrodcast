const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// Apne sabhi bot tokens yahan daalo
const BOT_TOKENS = [
  "6615271876:AAE6h3OtYFGfxF1I_SoJjtOwi6g5qYcXeAM",
  "6933960726:AAEYF_QtbhUGqvWU-kp4ByJ4oQeR9oH0q-g",
  "6579372811:AAFVr877XmXeCTA0wRh-joQRUKbd1_1SAgg"
];

// Default chat_id (channel/group/user)
const CHAT_ID = "-1002760349875";

// Simple API route
app.post("/broadcast", async (req, res) => {
  const message = req.body.message || "Default broadcast message!";
  let results = [];

  for (const token of BOT_TOKENS) {
    const url = `https://api.telegram.org/bot<6579372811:AAFVr877XmXeCTA0wRh-joQRUKbd1_1SAgg>/sendMessage?chat_id=<-1002760349875>&text=Hello`;
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
