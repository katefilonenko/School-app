const express = require('express');
const app = express();
const bodyParser = require ('body-parser');

const mongoose = require('mongoose');

const subjectsRoute = require('./src/app/routes/route-subjects');
const classesRoute = require('./src/app/routes/route-classes');

app.use(express.json());
app.use(bodyParser.json());

app.use('/school/subjects', subjectsRoute);
app.use('/school/classes', classesRoute);

app.get('/school', (req, res) => {
    res.send('Home page');
});
 
mongoose.connect(
    'mongodb://localhost:27017/school', { useNewUrlParser: true }, () => console.log('Successfully connected to DB')
);


app.listen(27017 , function() {
    console.log('Listen on port 27017...');
});
 