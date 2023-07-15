import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url"

import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/user.js"
import restaurantRoutes from "./routes/restaurant.js"
import pdfMenuRoutes from "./routes/pdfMenu.js"
import userAvatarRoutes from "./routes/userAvatar.js"
import faqRoutes from "./routes/faq.js"
import planRoutes from "./routes/plan.js"
import commentRoutes from "./routes/comment.js"

import { register } from "./controllers/auth.js"
import { verifyToken } from "./middleware/auth.js";

/*CONFIGURATIONS*/

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()

app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, "public/assets")))

/*FILE STORAGE*/

// Set up Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

/*ROUTES WITH FILES*/
app.use(upload.single('file'));

/*ROUTES*/
app.use("/auth", authRoutes)
app.use("/user", userRoutes)
app.use("/restaurant", restaurantRoutes)
app.use("/pdfMenu", pdfMenuRoutes)
app.use("/userAvatar", userAvatarRoutes)
app.use("/faq", faqRoutes)
app.use("/plan", planRoutes)
app.use("/comment", commentRoutes)

/*MONGOOSE SETUP*/

const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log("Server Port: " + PORT))
}).catch((error) => console.log(error + " did not connect"))  