import express from 'express'

const app = express()

const PORT = process.env.NODE_ENV || 8000

const auth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
)

app.get('/google', (req, res) => {
const url = 
});

app.listen(PORT, () =>{console.log("Server startd on port : ", PORT);});

