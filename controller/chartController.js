import {chartModel} from "../models/chartSchema.js";

const getAllrecords = async (req, res) => {
    try {
        const data = await chartModel.find({});
        res.send(data);

    } catch (error) {
        console.log(error.message);
    }

};

const createNewRecord = async (req, res) => {
    const { month, students, employees } = req.body;
    const data = await chartModel({
        month: month,
        students: students,
        employees: employees

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



export { getAllrecords, createNewRecord };