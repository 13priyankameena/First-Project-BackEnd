import express from 'express';
import { getAllrecords,createNewRecord } from '../controller/chartController.js';
const route = express.Router();

//route

route.get('/',getAllrecords);

route.post('/create',createNewRecord);



export default route;