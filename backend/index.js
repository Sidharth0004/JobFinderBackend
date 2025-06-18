import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js"; // Assuming this handles Mongoose connection
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

// Load environment variables from .env file
// This line should typically be at the very top of your entry file
dotenv.config({});

const app = express();

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded request bodies
app.use(cookieParser()); // To parse cookies

// CORS configuration
// Use process.env.FRONTEND_URL for dynamic origin in production
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Use env var for frontend URL
    credentials: true
};
app.use(cors(corsOptions));

// Define the port, prioritizing Render's PORT env var, then your .env, then a default
const PORT = process.env.PORT || 4000;

// Connect to the database and then start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error("Failed to connect to database:", err);
    process.exit(1); // Exit if DB connection fails
});


// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);