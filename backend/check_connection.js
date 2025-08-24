const mongoose = require('mongoose');

// Replace with your actual connection string
//KccmKxWqkAaznkSG
const mongoURI = 'mongodb+srv://rahulpatelkarru03:KccmKxWqkAaznkSG@cluster0.cld3vel.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// Load environment variables from .env file




async function checkConnection() {
    try {
        await mongoose.connect(mongoURI);
        console.log('✅ Success: Your MongoDB Atlas connection is working perfectly!');
    } catch (error) {
        console.error('❌ Failure: Unable to connect to MongoDB Atlas.');

        // More specific error checks
        if (error.name === 'MongooseServerSelectionError') {
            console.error('Reason: It seems your IP address is not whitelisted.');
            console.error('Solution: Go to MongoDB Atlas -> Network Access -> Add IP Address.');
            console.error('More Info:', error.message);
        } else if (error.name === 'MongoServerError') {
            console.error('Reason: It seems your username or password is incorrect.');
            console.error('Solution: Go to MongoDB Atlas -> Database Access -> Check/Reset Password.');
            console.error('More Info:', error.message);
        } else {
            console.error('Reason: An unexpected error occurred.');
            console.error('More Info:', error);
        }
    } finally {
        // Close the connection regardless of success or failure
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
        }
    }
}

// Run the diagnostic function
checkConnection();