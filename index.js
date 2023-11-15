import express from "express";
import "dotenv/config";
import cors from "cors";
import api from "./src/api/index.js";

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(api);

app.listen(process.env.PORT || 3000, () => {
    console.log("Exam Server started on Port: " + process.env.PORT || 3000);
});
