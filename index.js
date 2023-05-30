const express = require('express');
const path = require('path')
const port = 8000;
const app = express();
const db=require('./mongoose.js');
const ItemList=require('./Expense.js');
const Incomes=require('./Income.js');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  // Here we define where it views view_engine templete files (here it is ejs).



app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'assets')));



app.get('/', function (req, res) {
    // here we find data present in mention dataModel and pass it to given rendering page
    ItemList.find({}).then(data=>{
        return res.render('home',{ShopingList:data,title:"Expense list"});
    }).catch(function(err){
        console.log("Error in fetching the data : "+err);
    })
})
app.get('/Incomes', function (req, res) {
    // here we find data present in mention dataModel and pass it to given rendering page
    Incomes.find({}).then(data=>{
        return res.render('home2',{Expenses:data,title:"Income list"});
    }).catch(function(err){
        console.log("Error in fetching the data : "+err);
    })
})
app.post('/add-item', function (req, res) {
    //here we add req.body to database having model as ItemList
    var MyData=new ItemList(req.body);
    //Here we save that data
    MyData.save();
    return res.redirect('/');
})
app.post('/add-incomes', function (req, res) {
    //here we add req.body to database having model as Incomes
    var MyData=new Incomes(req.body);
    //Here we save that data
    MyData.save();
    return res.redirect('/Incomes');
})
app.get('/delete-item/', function (req, res) {
    let id=req.query.id;
    
    ItemList.findByIdAndDelete(id).then(function(){
        console.log("Item deleted sucessfully having id : "+id);
        return  res.redirect('/');;
    }).catch(function(err){
        console.log("Error in deleting the item : "+err);
    })
})
app.get('/delete-income/', function (req, res) {
    let id=req.query.id;
    Incomes.findByIdAndDelete(id).then(function(){
        console.log("Item deleted sucessfully having id : "+id);
        return  res.redirect('/Incomes');
    }).catch(function(err){
        console.log("Error in deleting the item : "+err);
    })
    
})

app.get('/report',function(req,res){
    // The below is used to fetch data from two models and passed to single rendering file. We used nested find for this as below.
    Incomes.find({}).then(data=>{
        console.log(data);
        ItemList.find({}).then(da=>{
            return res.render('report',{Income:data,Expense:da});
        }).catch(function(err){
            console.log(err);
        })
    }).catch(function(err){
        console.log(err);
    })
    // console.log(IncomeData)
    
})


app.listen(port, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Server is running sucessfully at port :" + port);
})