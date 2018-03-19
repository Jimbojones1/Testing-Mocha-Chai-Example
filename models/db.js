const mongoose = require('mongoose');
const config = require('config');
const connectionString = config.DBHost


mongoose.connect(connectionString);

mongoose.connection.on('connected', function(){
  console.log("Mongooseeee connected to " + connectionString);
});

mongoose.connection.on('error', function(error){
  console.log("Mongoose connection error: " + error);
})

mongoose.connection.on('disconnected', function(){
  console.log("Mongoose disconnected!")
})
