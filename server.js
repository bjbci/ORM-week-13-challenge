const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;


const routes = require('./routes');

// import sequelize connection
const sequelize = require('./config/connection'); 


console.log(express)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

//sync sequelize models to the database, then turn on the server
sequelize.sync({force:true}).then(()=>{
  
app.listen(PORT, () => 
console.log(`LISTENING ON PORT ${PORT}!`))

})

//require('dotenv').config();

// const Sequelize = require('sequelize');

// const sequelize = process.env.JAWSDB_URL
//   ? new Sequelize(process.env.JAWSDB_URL)
//   : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//       host: 'localhost',
//       dialect: 'mysql',
//       dialectOptions: {
//         decimalNumbers: true,
//       },
//     });

//