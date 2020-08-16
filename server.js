const express = require('express');
const app = express();
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");

const subjectsRoute = require('./src/app/back/routes/route-subjects');
const classesRoute = require('./src/app/back/routes/route-classes');


var corsOptions={
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/school/subjects', subjectsRoute);
app.use('/school/classes', classesRoute);

app.get('/school', (req, res) => {
    res.send('Home page'); 
});
 
mongoose.connect(
    'mongodb://localhost:27017/school', 
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    () => console.log('Successfully connected to DB')
);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
 