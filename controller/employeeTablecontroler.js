import {employee} from "../models/chartSchema.js";

const getEmployeesrecords =async (req,res) =>{
    try {
        const data = await employee.find({});
        res.send(data);
    } catch (error) {
        console.log(error.message);
    }
};

const createEmployeesRecord =async (req,res)=>{
    const{ID,EmployeeName,Age,Department} = req.body;
    const data = await employee({
        ID:ID,
        EmployeeName:EmployeeName,
        Age:Age,
        Department:Department
    });
    try {
        if (data) {
            await data.save();
            console.log("New record Created");
        }
        res.send(data);
    } catch (error) {
        console.log(error.message)
    }
};

export { getEmployeesrecords, createEmployeesRecord };