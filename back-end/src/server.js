import dotenv from "dotenv";
import  cron  from "node-cron";
import axios from 'axios'

dotenv.config();

import app from "./app.js";
import dbConnect from "./config/db.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    console.log("Attempting database connection..");
    await dbConnect();
    app.listen(PORT, (err) => {
      if (err) {
        return console.log("Server start error", err);
      }
      console.log("Server running on port :", PORT);

      // Cron setup for keep backend alive

      cron.schedule('*/14 * * * *', async () => {
        try {
          const renderUrl = 'https://the-royal-furnitures.onrender.com/ping';
          await axios.get(renderUrl);
          console.log('Self-ping successful: Server kept awake');
        } catch (error) {
          console.error('Self-ping failed:', error.message);
        }
      });

    });
  } catch (error) {
    console.log("Error while starting server", error);
    process.exit(1);
  }
};

startServer()