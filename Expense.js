const mongoose=require('mongoose');
// Here we created schema of database 
const ItemList=mongoose.Schema({
    item:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    quantity:{
        type:String
    }
})

// Here we created model of that schema which we will use
const Contact=mongoose.model('Expenses',ItemList);
// Here we exports that model
module.exports=Contact;