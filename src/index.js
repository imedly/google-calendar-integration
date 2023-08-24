import dotenv from "dotenv";
dotenv.config({});

import express from "express";
import { google } from "googleapis";
import dayjs from "dayjs";
import axios from "axios";

import {v4 as uuid} from "uuid";

const calendar = google.calendar({
 version : "v3",
 auth : process.env.API_KEY,
});

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
app.get("/google/redirect", async (req, res) => {
    const code = req.query.code;
    //const data = oauth2Client.getToken(code);
    //data.then((val) => {
    //   console.log(val.tokens);
    //});
const {tokens} = await oauth2Client.getToken(code);
oauth2Client.setCredentials(tokens);


    //const user_info = axios.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + token)
    //console.log(user_info.data);
    //res.send("It's working");

    res.send({
        msg : "You have successfully logged in ",
    });
});

app.get('/schedule_event', async (req, res) => {
  
    console.log(oauth2Client.credentials.access_token);
  
    await calendar.events.insert({
       calendarId : "primary",
       auth : oauth2Client,
       conferenceDataVersion : 1,
       requestBody : {
           summary : "This is a test event",
           description : "somme event that is very important",
           start: {
            dateTime: dayjs(new Date()).add(1, 'day').toISOString(),
            timeZone: "Africa/Casablanca", // Utilisez "Africa/Casablanca" pour le Maroc
            },
          
          end: {
            dateTime: dayjs(new Date()).add(1, 'day').add(1, 'hour').toISOString(),
            timeZone: "Africa/Casablanca", // Utilisez "Africa/Casablanca" pour le Maroc
            },
          conferenceData: {
                createRequest: {
                    requestId : uuid(),
                },
          },  
          attendees : [
            {email : "iddouchelmehdi@gmail.com",},
          ],
       },
    });
       res.send({msg : "Done",});
});
   

app.listen(PORT, () => {
  console.log("Server started on port:", PORT);
});
