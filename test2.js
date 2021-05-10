const  response  = require('express');
const express = require('express');
const app = express();

const Datastore = require('nedb');

app.listen(3000, () => console.log('listening to 3000'));

//app.use lets anyone see whatever is in index.html file
//express.static is hosting the file
app.use(express.static('public'));

//enable server to use incoming data as json 
app.use(express.json({limit: '1mb'}));

//save database values in datastore function
const database = new Datastore('database.db');
database.loadDatabase();
database.insert({name: 'wolf', status: 'mad'});

//route
app.post('/api', (request, response) => {
    console.log('request!');
    console.log(request.body);

    //making lat and long available here
    const data = request.body;

    //setting a timestamp to values inserted
    const timestamp = Date.now();
    data.timestamp = timestamp;

    database.insert(data);
    //console.log(database);

    response.json({
        status: 'success',
        latitude: data.lat,
        longitude: data.long
    });
});