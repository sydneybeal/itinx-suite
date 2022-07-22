const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
// const aws = require('aws-sdk');
// const ejs = require('ejs');
var bodyParser = require('body-parser');

const app = express();

//var port = process.env.PORT || 8081;

const connection = mysql.createConnection({
  // Local MySQL Setup
  host: 'localhost',
  user: 'root',
  password: 'dbuser123',
  database: 'itinx-db'
  /* // AWS Setup
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT,
  database : process.env.RDS_DB_NAME
  */
});

app.use(cors());

connection.connect(err => {
  /*
  if(err) {
    return err;
  }
  */
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');

});



// TODO modify to object of a property (hotel/lodge/resort)
// create the necessary table if necessary using SQL
const createPropertyTable = `CREATE TABLE IF NOT EXISTS properties(
                        property_id int(11) not null auto_increment,
                        name varchar(100) not null,
                        portfolio varchar(100) default null,
                        rep varchar(100) default null,
                        city_region varchar(100) default null,
                        country varchar(45) default null,
                        inclusions varchar(500) default null,
                        notes varchar(500) default null,
                        type varchar(45) default null,
                        webpage varchar(255) default null,
                        airstrip varchar(45) default null,
                        PRIMARY KEY (property_id)
                    )`;

const createBedNightTable = `CREATE TABLE IF NOT EXISTS bednight_entries(
                        entry_id int(11) not null auto_increment,
                        propertyName varchar(100) not null,
                        portfolio varchar(100) default null,
                        rep varchar(100) default null,
                        primaryTraveler varchar(100) default null,
                        numPax int default null,
                        dateIn date default null,
                        dateOut date default null,
                        consultant varchar(100) default null,
                        PRIMARY KEY (entry_id)
                    )`;

const createServiceProviderView = `CREATE VIEW service_providers_v
                        AS SELECT
						              a.entry_id entry_id,
                          a.propertyName propertyName,
                          b.portfolio portfolio,
                          b.rep rep,
                          a.primaryTraveler primaryTraveler,
                          a.numPax numPax,
                          a.dateIn dateIn,
                          a.dateOut dateOut,
                          SUM(DATEDIFF(a.dateOut,a.dateIn) * a.numPax) AS bednights,
                          a.consultant consultant
                        FROM bednight_entries a
                        INNER JOIN properties b
                        ON a.propertyName = b.name
                        GROUP BY a.propertyName, a.entry_id, b.portfolio, b.rep, a.primaryTraveler, a.numPax, a.dateIn, a.dateOut, a.consultant
                        ORDER BY a.entry_id;`
                      ;


connection.query(createPropertyTable, (err, results) => {
  if (err) {
    console.log(err.message);
  }
});

connection.query(createBedNightTable, (err, results) => {
  if (err) {
    console.log(err.message);
  }
});

// set all properties query
const SELECT_ALL_PROPERTIES_QUERY = `SELECT * FROM properties`;
const SELECT_ALL_ENTRIES_QUERY = `SELECT * FROM bednight_entries`;
const SELECT_ALL_SPS_QUERY = `SELECT * FROM service_providers_v`;


app.get('/', (req,res) => {
  res.send(`Go to /properties to see properties`);
});


app.get('/properties', (req,res) => {
  //res.json(properties);
  connection.query(SELECT_ALL_PROPERTIES_QUERY, (err, results) => {
    if(err) {
      return res.send(err);
    } else {
      return res.json( {
        data: results
      });
    }
  });
});

app.get('/properties/search', (req,res) => {
  const { searchTerm } = req.query;

  const GET_RESULTS_QUERY = `SELECT * FROM properties WHERE
    name LIKE '%${searchTerm}%' OR portfolio LIKE '%${searchTerm}%'
    OR rep LIKE '%${searchTerm}%' OR city_region LIKE '%${searchTerm}%'
    OR country LIKE '%${searchTerm}%' OR inclusions LIKE '%${searchTerm}%'`;
  //res.json(properties);
  connection.query(GET_RESULTS_QUERY, (err, results) => {
    if(err) {
      return res.send(err);
    } else {
      return res.json( {
        data: results
      });
    }
  });
  // connection.query(GET_RESULTS_QUERY, (err, rows, results) => {
  //   if(err) {
  //     return res.send(err);
  //   } else if (!err && rows.length > 0) {
  //     return res.json({ data: rows[0] });
  //   } else {
  //     return
  //     //   res.json( {
  //     //   data: results
  //     // });
  //   }
  // })
});

app.get('/properties/add', (req, res) => {
  const { name, portfolio, rep, city_region, country,
    inclusions, notes, type, webpage, airstrip } = req.query;

  const INSERT_PROPERTIES_QUERY = `INSERT INTO properties (name, portfolio, rep, city_region, country,
    inclusions, notes, type, webpage, airstrip)
    VALUES ('${name}', '${portfolio}', '${rep}', '${city_region}', '${country}', '${inclusions}',
         '${notes}', '${type}', '${webpage}', '${airstrip}')`;
  connection.query(INSERT_PROPERTIES_QUERY, (err, results) => {
    if(err) {
      return res.send(err);
    } else {
      return res.send('Successfully added property');
    }
  })
});

app.get('/properties/remove', (req, res) => {
  const { property_id, name, city_region } = req.query;
  console.log(name, city_region);
  const DELETE_PROPERTIES_QUERY = `DELETE FROM properties
    WHERE property_id=${property_id}`;
  connection.query(DELETE_PROPERTIES_QUERY, (err, results) => {
    if(err) {
      return res.send(err);
    } else {
      return res.send('Successfully deleted property');
    }
  })
});

// Bed night entry functions

app.get('/bednightEntries', (req,res) => {
  connection.query(SELECT_ALL_ENTRIES_QUERY, (err, results) => {
    if(err) {
      return res.send(err);
    } else {
      return res.json( {
        data: results
      });
    }
  });
});


app.get('/bednightEntries/add', (req, res) => {
  const { propertyName, portfolio, rep, primaryTraveler, numPax,
    dateIn, dateOut, consultant } = req.query;

  console.log(propertyName, portfolio, rep, primaryTraveler, numPax,
    dateIn, dateOut, consultant);

  const INSERT_ENTRIES_QUERY = `INSERT INTO bednight_entries (propertyName, portfolio, rep, primaryTraveler, numPax,
    dateIn, dateOut, consultant)
    VALUES ('${propertyName}', '${portfolio}', '${rep}', '${primaryTraveler}', '${numPax}', '${dateIn}',
         '${dateOut}', '${consultant}')`;
  connection.query(INSERT_ENTRIES_QUERY, (err, results) => {
    if(err) {
      return res.send(err);
    } else {
      return res.send('Successfully added entry');
    }
  })
});

app.get('/bednightEntries/getPortfolioRep', (req, res) => {
  const { propertyName } = req.query;

  console.log(propertyName + "HeLLO World");

  const GET_INFO_QUERY = `SELECT portfolio, rep FROM properties WHERE
    name = '${propertyName}'`;
  connection.query(GET_INFO_QUERY, (err, rows, results) => {
    if(err) {
      return res.send(err);
    } else if (!err && rows.length > 0) {
      return res.json({ data: rows[0] });
    } else {
      return res.json( {
        data: results
      });
    }
  })
});

app.get('/bednightEntries/remove', (req, res) => {
  const { entry_id, propertyName, primaryTraveler } = req.query;
  console.log(propertyName, primaryTraveler);
  const DELETE_ENTRIES_QUERY = `DELETE FROM bednight_entries
    WHERE entry_id=${entry_id}`;
  connection.query(DELETE_ENTRIES_QUERY, (err, results) => {
    if(err) {
      return res.send(err);
    } else {
      return res.send('Successfully deleted entry');
    }
  })
});

// Service Provider info and reporting

app.get('/serviceProviderView', (req,res) => {
  connection.query(SELECT_ALL_SPS_QUERY, (err, results) => {
    if(err) {
      return res.send(err);
    } else {
      return res.json( {
        data: results
      });
    }
  });
});

app.get('/serviceProviderView/search', (req,res) => {
  const { searchTerm } = req.query;

  const GET_RESULTS_QUERY = `SELECT * FROM service_providers_v WHERE
    propertyName LIKE '%${searchTerm}%' OR portfolio LIKE '%${searchTerm}%'
    OR rep LIKE '%${searchTerm}%' OR primaryTraveler LIKE '%${searchTerm}%'
    OR consultant LIKE '%${searchTerm}%'`;

  connection.query(GET_RESULTS_QUERY, (err, results) => {
    if(err) {
      return res.send(err);
    } else {
      return res.json( {
        data: results
      });
    }
  });
});


app.get('/serviceProviderView/report', (req,res) => {
  const { propertyName, portfolio, rep, startDate, endDate, consultant } = req.query;
  PULL_REPORT_QUERY = `SELECT * FROM service_providers_v`;
  Q_FILTER = '';
  DATE_FILTER = '';
  FINAL_QUERY = '';

  if (propertyName === '' && portfolio === '' && portfolio === '' && portfolio === '') {
    Q_FILTER = '';
  } else {
    if (propertyName !== '' && propertyName !== 'undefined') {
      Q_FILTER = `propertyName='${propertyName}'`;
    } else if (portfolio !== '' && portfolio !== 'undefined') {
      Q_FILTER = `portfolio='${portfolio}'`;
    } else if (rep !== '' && rep !== 'undefined') {
      Q_FILTER = `rep='${rep}'`;
    } else if (consultant !== '' && consultant !== 'undefined') {
      Q_FILTER = `consultant='${consultant}'`;
    }
  }

  if (startDate !== '' && startDate !=='undefined') {
    DATE_FILTER = `dateIn>='${startDate}' AND dateIn<='${endDate}'`
  }

  if (Q_FILTER !== '' && DATE_FILTER !== ''){
    FINAL_QUERY = `${PULL_REPORT_QUERY} WHERE ${Q_FILTER} AND ${DATE_FILTER}`
  } else if (Q_FILTER === '' && DATE_FILTER !== ''){
    FINAL_QUERY = `${PULL_REPORT_QUERY} WHERE ${DATE_FILTER}`
  } else if (Q_FILTER !== '' && DATE_FILTER === ''){
    FINAL_QUERY = `${PULL_REPORT_QUERY} WHERE ${Q_FILTER}`
  }

  console.log(FINAL_QUERY)

  connection.query(FINAL_QUERY, (err, results) => {
    if(err) {
      return res.send(err);
    } else {
      return res.json( {
        data: results
      });
    }
  })
});

// listen to port

app.listen(4000, () => {
  console.log(`Database server listening on port 4000`)
});
