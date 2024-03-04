const mongoose=require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const massageSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please add a name']
    },
    email:{
        type:String,
        required:[true,'Please add an email'],
        unique: true,
        match: [
            /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email'
        ]
    },
    tel: {
        type: String,
        required: [true, 'Please add telephone number'],
        maxlength: [10, `can't add more`]
      },
    openclosetime: {
        type: Date,
        required: [true, 'Please add open-close time']
    }
}) ;
// Encrypt password using bcrypt
massageSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    
});

// Sign JWT and return
massageSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
            expiresIn: process.env.JWT_EXPIRE
    });
}

// Match user entered password to hashed password in database
massageSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}



module.exports = mongoose.model('massage' , massageSchema);