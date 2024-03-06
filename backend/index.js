const express = require("express");
const cors = require('cors')
const v1Router = require ("./routes");
const app = express();
require('dotenv').config();

app.use(cors())
app.use(express.json());

app.use("/api/v1", v1Router)

app.listen(process.env.PORT);