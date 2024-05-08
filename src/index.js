import express from "express";
import cors from "cors";
import router from "./routers/router.js";
import dotenv, { config } from "dotenv";
import { connectToDatabase } from "./config/db.config.js";
import { configCloudinary } from "./config/cloudinary.config.js";

const app = express();
const PORT = 3001;

dotenv.config();
connectToDatabase();
configCloudinary();

app.use(express.json());
app.use(cors("*"));

app.use("/api/v1", router);

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});
