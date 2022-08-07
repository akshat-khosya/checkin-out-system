import express from "express";
import log from "./logger";
import config from "config";
import connect from "./db/connect";
import routes from "./routes";
import { deserializeUser } from "./middleware";


const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(deserializeUser);


app.listen(port, host, () => {
  log.info(`Server is listening at http://${host}:${port}`);
  connect();
  routes(app);
});
