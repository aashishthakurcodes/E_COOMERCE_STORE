import express from "express";
import morgan from "morgan";
import colors from "colors";
import dotenv from "dotenv";
import connectDb from "./Config/dbConnect.js";
import authRoutes from "./Routes/authRoutes.js";
import categoryRoutes from './Routes/categoryRoutes.js'
import productRoutes from './Routes/productRoutes.js'
import cors from'cors'

//Configure env
dotenv.config();

//Db call
connectDb();

//Rest ooject
const app = express();

//Middlewaress
//Using cors
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//Routes
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/product',productRoutes)

// Rest API
app.get("/", (req, res) => {
  res.send("<h1>Welcome to our ECommerce App</h1>");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on the port=${PORT}`.brightYellow.bgBrightRed);
});
