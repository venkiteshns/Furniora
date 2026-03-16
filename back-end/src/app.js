import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use(
  cors({
    origin: "https://furniora-five.vercel.app",
    credentials: true,
  })
);

import router from './routes/user.js'

app.use('/',router)


app.use((err, req, res, next) => {
  console.error("Server error occurred:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;