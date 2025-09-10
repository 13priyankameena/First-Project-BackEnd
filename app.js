import express from 'express';
import ConnectDBS from './db/ConnectDB.js';
import route from './routes/route.js';
import routechart from './routes/routeChart.js';
import cors from 'cors'; 
import bodyParser from "body-parser";
import dotenv from "dotenv";
const app= express();

dotenv.config();
const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;



app.use(bodyParser.json());


//database connection

ConnectDBS(MONGOURL)

//API
app.use(express.json());

app.use(cors());


//route

    app.use('/',routechart);

app.listen(PORT,()=>{
    console.log(`Server is Running on port: ${PORT}`);
})