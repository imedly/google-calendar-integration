import express from 'express'

const app = express()

const PORT = process.env.NODE_ENV || 8000

app.listen(PORT, () =>{console.log("Server startd on port : ", PORT);});

