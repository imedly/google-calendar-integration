import dotenv from "dotenv";
dotenv.config({});

import express from "express";
import { google } from "googleapis";

const app = express();

const PORT = process.env.PORT || 8000; // Corrected process.env.PORT

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

const scopes = ["https://www.googleapis.com/auth/calendar"];

app.get("/google", (req, res) => {
    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
      redirect_uri: process.env.REDIRECT_URL // Spécifiez explicitement le redirect_uri ici
    });
    res.redirect(url);
  });
  

// Corrected parameter order: (req, res)
app.get("/google/redirect", (req, res) => {
  res.send("It's working");
});

app.listen(PORT, () => {
  console.log("Server started on port:", PORT);
});
