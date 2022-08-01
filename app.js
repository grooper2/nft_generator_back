// const dependencies
import express from "express"
import { json }  from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import { dirname, join } from "path"
import { fileURLToPath } from "url"
import usersRouter from "./routes/users-routes.js"
import authRouter from "./routes/auth-routes.js"
import generator from "./routes/generator-routes.js"

dotenv.config(); // setup dotenv

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 4000;
const corsOptions = { credentails: true, origin: process.env.url || "*" };

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(json());

app.use("/", express.static(join(__dirname, "public")));
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/nft", generator);

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
