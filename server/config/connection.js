const mongoose = require('mongoose');

const URL = process.env.MONGO_URL ? process.env.MONGO_URL : 'mongodb://mongo/ACM';

mongoose.set('useCreateIndex', true);

mongoose.set('useUnifiedTopology', true);

mongoose.set('useFindAndModify', false);

//Connection
mongoose.connect(URL, {
    useNewUrlParser: true,
    useCreateIndex: true
});

//Models
const db = mongoose.connection;

//We enabled the Listener
db.on('error', () => {
    console.error('Error occured in db connection');
});

db.on('open', () => {
    console.log('DB Connection established successfully');
});