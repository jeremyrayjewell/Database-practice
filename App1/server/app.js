require('dotenv').config(); // Load environment variables from a .env file

function connect(config) {
  // Implement your own connection logic here using the 'config' object
  // Replace this with your actual database connection logic
  return {
    execute: function (query, params) {
      // Implement your execution logic here
      // Replace this with your actual database query execution logic
      return new Promise((resolve, reject) => {
        // Simulate a query execution
        setTimeout(() => {
          console.log('Executing query:', query, 'with parameters:', params);
          resolve({ rows: [{ result: 1 }] });
        }, 1000);
      });
    },
  };
}

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

(async function () {
  try {
    const conn = connect(config);
    const results = await conn.execute('select 1 from dual where 1=?', [1]);
    console.log('Results:', results);
  } catch (error) {
    console.error('Error:', error);
  }
})();

//Rest of code

const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));


// create
app.post('/insert', (request, response) => {
    const { name } = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.insertNewName(name);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});

// read
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

// update
app.patch('/update', (request, response) => {
    const { id, name } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.updateNameById(id, name);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

// delete
app.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

app.get('/search/:name', (request, response) => {
    const { name } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByName(name);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

app.listen(process.env.PORT, () => console.log('app is running'));
