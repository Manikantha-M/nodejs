const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://Manikantha:DlMJUfvg096ep5AE@cluster0.fl8usdk.mongodb.net/nodejs?retryWrites=true&w=majority';

const connectToDatabase = async () => {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

connectToDatabase();
