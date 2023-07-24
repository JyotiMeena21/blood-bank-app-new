const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require ("path");


dotenv.config();

//mongodb connection
connectDB();


const app=express();

//midlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));

app.use(express.static(path.join(__dirname,"./client/build")));

app.get("*", function (req,res){
  res.sendFile(path.join(__dirname,"./client/build/index.html"));
});

const PORT= process.env.PORT;

app.listen(PORT,() => {
  console.log(`server is running on port ${process.env.PORT}`);
}
)
