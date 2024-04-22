import bodyParser from "body-parser";
import express, { Express } from "express";
import router from "./Routes/parser.route";
import cors from "cors";

const app: Express = express();
const port = 3000 || process.env.PORT;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false, limit: "200mb" }));
app.use(bodyParser.json({ limit: "200mb" }));

app.use("", router);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});