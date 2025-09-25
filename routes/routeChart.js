import express from 'express';
import {getAllrecords,createNewRecord} from '../controller/chartController.js';
import { getStudentrecords,createStudentRecord } from '../controller/studentTableControler.js';
import { getEmployeesrecords,createEmployeesRecord } from '../controller/employeeTablecontroler.js';
import { getuserLogin,createLoginRecord } from '../controller/loginController.js';
import { getFormrecords,createFormTRecord } from '../controller/formController.js';
import { verifyToken } from '../middleware/verifyToken.js';
const routechart = express.Router();

// routes
routechart.post('/chartDB/logins', getuserLogin);
routechart.post('/chartDB/logins/create',createLoginRecord);

routechart.post('/chartDB/forms/create',createFormTRecord);
routechart.get('/chartDB/forms',getFormrecords);

routechart.get('/chartDB/chartdatas',verifyToken, getAllrecords);
routechart.post('/chartDB/chartdatas/create',verifyToken, createNewRecord);

routechart.get('/chartDB/students',verifyToken, getStudentrecords);
routechart.post('/chartDB/students/create',verifyToken, createStudentRecord);

routechart.get('/chartDB/employees',verifyToken, getEmployeesrecords);
routechart.post('/chartDB/employees/create',verifyToken, createEmployeesRecord);








export default routechart;