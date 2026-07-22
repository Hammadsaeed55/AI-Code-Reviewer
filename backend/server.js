import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api", reviewRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});