
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/products').then(
    ()=>{
        console.log('connected!!!');
    }

);
module.exports=mongoose