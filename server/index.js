import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import postRoutes from "./routes/forms.js";
import userRoutes from "./routes/users.js";
import donorRoutes from "./routes/donor.js";
import donateeRoutes from "./routes/donatee.js";
// import agentRoutes from "./routes/agent.js";


// init express
const app = express();
dotenv.config();

// image size
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// cors to prevent localhost error for accessing api
app.use(cors());

// Put routes here after cors
app.use("/forms", postRoutes); // localhost:5000/forms
app.use("/user", userRoutes); // a route for the User
app.use("/donor", donorRoutes);
app.use("/donatee", donateeRoutes);

// Heroku api, ignore this part
// app.get('/', (req, res) => {
//     res.send('Hello to api');
// });

// use mongodb Atlas  (under .env)
const PORT = process.env.PORT || 5000; // port 5000 //(process.env gonna be populated by heroku)

//connect to DB
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  ) // success
  .catch((error) => console.log(error.message));

//mongoose.set('useFindAndModify', false);
