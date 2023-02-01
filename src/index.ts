import express, { Application } from "express";
import dotenv from "dotenv";
import router from "./routes";
import bodyParser = require("body-parser");

dotenv.config();
const port = process.env.NODE_ENV;
const app: Application = express();

app.use(bodyParser.json());
app.use(router);

(() => {
  app.listen(port, (): void => {
    console.log(`The server is running at ${port} port `);
  });
})();
