import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const allowedOrigins = [
  "http://localhost:5173",
  "https://furniora-five.vercel.app"
]

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error("CORS not allowed"))
      }
    },
    credentials: true
  })
)

import router from './routes/user.js'

app.use('/', router)


app.use((err, req, res, next) => {
  console.error("Server error occurred:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;