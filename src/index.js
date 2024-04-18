import "dotenv/config";
import app from "./app.js";
import { config } from "./config.js";
import { dbConnect } from "./db/db.js";

const port = config.PORT;
// process.on("uncaughtException", (error) => {
//   errorHandler.handleError(error);
//   if (!errorHandler.isTrustedError(error)) {
//     process.exit(1);
//   }
// });

dbConnect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("🚀 ~ err:", err);
    console.log("Somthing went wrong in DB connection");
  });
