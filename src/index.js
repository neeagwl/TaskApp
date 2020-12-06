// "C:\Program Files\MongoDB\Server\4.4\bin\mongo.exe"
const app = require('./app');
const port = process.env.PORT 

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
