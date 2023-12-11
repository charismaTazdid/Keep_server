import express from "express";
import cors from "cors";
import authRoute from "./router/authRoute.js";
import postRoute from "./router/postRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5500;
const hostname = "localhost";

app.use("/auth", authRoute);
app.use("/post", postRoute);

app.get("/", (req, res) => {
    res.send("Message from server!")
});
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});