import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import activitate from './routes/ActivitateRoute.js';
import feedback from './routes/FeedbackRoute.js';
import profesor from './routes/ProfesorRoute.js';
import student from './routes/StudentRoute.js';


// Fisierul pentru pornirea serverului REST 

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', activitate);
app.use('/api', feedback);
app.use('/api', profesor);
app.use('/api', student);

let port = process.env.PORT || 8000;
app.listen(port);
console.log('API is runnning at ' + port);
