import dotenv from "dotenv";

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
        return console.log("Server start error");
      }
      console.log("Server running on port :", PORT);
    });
  } catch (err) {
    console.log("Error while starting server", error);
    process.exit(1);
  }
};

startServer()