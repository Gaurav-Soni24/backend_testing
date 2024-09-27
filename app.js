const express = require("express")
const mongoose = require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/mydatabase');


const departementschema = mongoose.Schema({
    id: Number,
    Name: String,
    Duties: String,
    StartDate: Date,
    DeptHead: String
})

var departementModel = mongoose.model("department", departementschema)

const employeeschema = mongoose.Schema({
    id: Number,
    Email: String,
    firstName: String,
    lastName: String,
    joiningDate: Date,
    leavingDate: Date,
    departement: String,
    designation: String
})

var employeeModel = mongoose.model("employee", employeeschema)

const app = express();


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/CreateDepartment", async (req, res) => {
    try {
        const { dept_id, name, duties, startdate, dept_head } = req.body;

        if (!dept_id || !name || !duties || !startdate || !dept_head) {
            return res.status(400).json("Please provide all required fields");
        }

        console.log(`Received data: ${dept_id}, ${name}, ${duties}, ${startdate}, ${dept_head}`);

        const createdDepartment = await departementModel.create({
            id: dept_id,
            Name: name,
            Duties: duties,
            StartDate: startdate,
            DeptHead: dept_head,
        });

        res.json("Data received and department created successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
});

app.post("/CreateEmployee", async (req, res) => {
    try {
        const { emp_id, email, firstname, lastname, joiningdate, leavingdate, department } = req.body;

        if (!emp_id || !email || !firstname || !lastname || !joiningdate || !leavingdate || !department) {
            return res.status(400).json("Please provide all required fields");
        }

        console.log(`Received data: ${emp_id}, ${email}, ${firstname}, ${lastname}, ${joiningdate}, ${leavingdate}, ${department}`);

        const createdEmployee = await employeeModel.create({
            id: emp_id,
            Email: email,
            firstName: firstname,
            lastName: lastname,
            joiningDate: joiningdate,
            leavingDate: leavingdate,
            department: department,
        });

        res.json("Data received and employee created successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
});

app.get('/getDepartment', async function (req, res) {
    const CreateDepartment = await departementModel.find();
    res.send(CreateDepartment)
});

app.get('/', async function (req, res) {
    res.send('Hello World');
});


app.get('/getEmployee', async function (req, res) {
    const CreateEmployee = await employeeModel.find();
    res.send(CreateEmployee)
});


app.listen(2000)