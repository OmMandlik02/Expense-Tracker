const mongoose=require('mongoose');
// Here we created schema of database 
const ItemList=mongoose.Schema({
    descrption:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    }
})
// Here we created model of that schema which we will use
const Income=mongoose.model('Incomes',ItemList);
// Here we exports that model
module.exports=Income;