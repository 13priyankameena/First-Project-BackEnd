import mongoose from "mongoose";

const chartSchema = new mongoose.Schema({

    // { name: "Jan", students: 40, employees: 24 },
    month: {
        type: String,
        required: true
    },
    students: {
        type: Number,
        required: true
    },
    employees: {
        type: Number,
        required: true
    }

})

const studentSchema = new mongoose.Schema({
    ID: {
        type: Number,
        required: true
    },
    StudentName: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        required: true
    },
    Subject: {
        type: String,
        required: true
    }
})


const EmployeesSchema = new mongoose.Schema({
    ID: {
        type: Number,
        required: true
    },
    EmployeeName: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        required: true
    },
    Department: {
        type: String,
        required: true
    }
})


const LoginSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

})

const FormSchema = new mongoose.Schema({

    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        required: true
    },
    DescribeYou: {
        type: String,
        required: true
    },
    RecommendToFriend: {
        type: String,
        required: true
    },
    Languages: {
        type: [String],
        required: true,
         default: []
    },
    Comment: {
        type: String,
        
        default:"No Comments"
    }

})

const FileSchema =new mongoose.Schema({

    FileName:{
        type:String,
        required:true,
    },
    Base64File:{
        type:String,
        required:true,
    }
})
const chartModel = mongoose.model('chartdata', chartSchema);
const student = mongoose.model('student', studentSchema);
const employee = mongoose.model('employee', EmployeesSchema);
const login = mongoose.model('login', LoginSchema);
const form = mongoose.model('form', FormSchema);
const file =mongoose.model('file',FileSchema);

export { chartModel, student, employee, login, form, file };