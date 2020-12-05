// "C:\Program Files\MongoDB\Server\4.4\bin\mongo.exe"
const mongoose=require("mongoose");

mongoose.connect(process.env.DB_URL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
});
