// "C:\Program Files\MongoDB\Server\4.4\bin\mongo.exe"
const mongoose=require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/task-app-api',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
});
