const cors = require('cors');
var morgan = require('morgan');
const mongoose = require('mongoose');
const ApiError = require('./utils/ApiError');
const {errorConverter, errorHandler} = require('./middlewares/error');
const express = require('express');
const Streamer = require('./models/steamer.model');

const PORT = 4001;
const app = express();


const MONGO_URL = "mongodb://localhost/currencyConvert";

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });


app.use(cors());
app.use(morgan('dev'));


app.get('/all-streams', (req, res) => {
    Streamer.find({}, (err, streams) => {
        if (err) throw err;

        console.log(`${streams.length} streams retrived from DB.`);
        parsedStreams = [];
        streams.map(stream =>  {
            console.log("----------> ", stream)
            parsedStreams.push({ id: stream._id, curr: stream.curr });
        });
        console.log(parsedStreams)
        res.status(200).send(parsedStreams); 
    });
});


app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not Found'));
});

app.use(errorConverter);
app.use(errorHandler);


app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));
