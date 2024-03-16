// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const MongoClient = mongodb.MongoClient;
const mongoURL = 'mongodb://localhost:27017'; 
const dbName = 'react-login-tut'; 


MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
    }
    console.log('Connected to MongoDB');
    const db = client.db(dbName);

    
    app.post('/api/saveData', (req, res) => {
        const data = req.body;
        
        db.collection('collections').insertOne(data, (err, result) => {
            if (err) {
                console.error('Error saving data to MongoDB:', err);
                res.status(500).send('Error saving data');
                return;
            }
            console.log('Data saved to MongoDB');
            res.status(200).send('Data saved successfully');
        });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
