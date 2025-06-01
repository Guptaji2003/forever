const express = require("express");
const app = express();
const cors = require("cors");
const connectdb = require("./db/db");
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/users",require("./Routes/userroute.js"));
app.use("/api/products",require("./Routes/productroute.js"));
app.use(require("./Routes/orderroute.js"));

app.listen(process.env.PORT, () => {
  connectdb();
  console.log(`server is running on port ${process.env.PORT}`);
});
