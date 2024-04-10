import express from 'express';
import dotenv from 'dotenv';
import connection from './database/db.js';
import Router from './routes/route.js'
import cors from 'cors';
import bodyParser from 'body-parser';
import methodOverride from 'method-override'

dotenv.config();

const app = express();
// middleware
app.use(cors());
app.use(bodyParser.json({extended : true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use('/',Router)



const PORT = 8000;

app.listen(PORT, () => { console.log(`server is running succesfully on Port ${PORT}`) });

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

connection(USERNAME,PASSWORD);