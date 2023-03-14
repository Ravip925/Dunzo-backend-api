const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const loginRoute = require("./routes/login");
const signUpRoute = require("./routes/users");
const productRoute = require("./routes/product");
const razorpayRoute = require("./routes/razorpay");

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}));

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },)
  .then(() => {
    console.log("db connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });

  app.get("/api/data", (req,res)=>{
    res.send("successfull");
  })

 

  app.use("/api/login", loginRoute); 
  app.use("/api/auth/signup", signUpRoute); 
  app.use("/api/products", productRoute); 
  app.use("/api/checkout", razorpayRoute); 

app.listen(process.env.PORT || 8000, () => {
  console.log("server is running");
});
 