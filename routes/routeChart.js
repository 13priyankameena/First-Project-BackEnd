import express from 'express';
import {getAllrecords,createNewRecord} from '../controller/chartController.js';
import { getStudentrecords,createStudentRecord } from '../controller/studentTableControler.js';
import { getEmployeesrecords,createEmployeesRecord } from '../controller/employeeTablecontroler.js';
import { getuserLogin } from '../controller/loginController.js';
import { getFormrecords,createFormTRecord } from '../controller/formController.js';
const routechart = express.Router();

// routes
routechart.get('/chartDB/chartdatas', getAllrecords);
routechart.post('/chartDB/chartdatas/create', createNewRecord);

routechart.get('/chartDB/students', getStudentrecords);
routechart.post('/chartDB/students/create', createStudentRecord);

routechart.get('/chartDB/employees', getEmployeesrecords);
routechart.post('/chartDB/employees/create', createEmployeesRecord);

routechart.post('/chartDB/logins', getuserLogin);

routechart.post('/chartDB/forms/create',createFormTRecord);
routechart.get('/chartDB/forms',getFormrecords);






export default routechart;