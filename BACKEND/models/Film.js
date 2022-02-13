const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filmSchema = new Schema({
  userId:{
    type: String,
    required: true
  },
  userName:{
    type: String,
    required: true
  },
  genres:{
    type: String,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  trailer:{
    type: String,
    required: true
  },
  duration:{
    type: String,
    required: true
  },
  state:{
    type:String,
    required: true
  },
  filmimage:{
    type: String,
  },
  filmyear:{
    type: String,
    required: true
  },
  currentdate:{
    type: String,
  }
})

const Film = mongoose.model("Film",filmSchema);
module.exports = Film;