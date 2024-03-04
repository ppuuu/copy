const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
  },
  tel: {
    type: String,
    required: [true, 'Please add telephone number'],
    maxlength: [10, `can't add more`]
  },
  email: {
    type: String,
    required: [true, 'Please add a district'],
    match: [
      /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
      'Please add a valid email'
  ]
  },
  password: {
    type: String,
    required: [true, 'Please add a province'],
    maxlength: [30,`can't add more`]
  },
  role : {
    type : String,
    enum : ["admin" , "user"],
    default : "user",
    required : [true , "please add role"]
  }
});

module.exports = mongoose.model('User', UserSchema);
