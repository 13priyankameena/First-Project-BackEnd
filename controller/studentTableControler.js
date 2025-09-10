import { student } from "../models/chartSchema.js";


const getStudentrecords =async (req,res) =>{
    try {
        const data = await student.find({});
        res.send(data);
    } catch (error) {
        console.log(error.message);
    }
};

const createStudentRecord =async (req,res)=>{
    const{ID,StudentName,Age,Subject} = req.body;
    const data = await student({
        ID:ID,
        StudentName:StudentName,
        Age:Age,
        Subject:Subject
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

export { getStudentrecords, createStudentRecord };