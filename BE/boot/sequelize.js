const config = require('../config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.DATABASE_URL);

sequelize
  .authenticate()
  .then(() => {
    console.log('Sequelize connection has been established successfully.');
    require('../components/db');
    sequelize.sync();
    
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;
