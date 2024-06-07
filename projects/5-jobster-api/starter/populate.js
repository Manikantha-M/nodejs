require('dotenv').config();

const mockData = require('./MOCK_DATA.json');

const Job = require('./models/Job');

const {connectToDatabase} = require('./db/connect');

const populateData = async() => {
    try {
        await connectToDatabase(process.env.MONGO_URI);
        await Job.create(mockData);
        console.log('successfully populated');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
// populateData()