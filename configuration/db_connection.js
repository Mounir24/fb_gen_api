const mongoose = require('mongoose');

// START MONGODB CONNECTION URI
const dbConnection = async (URI) => {
    // CHECK IF THERES MONGO_DB URI IN .ENV FILE 
    if (!process.env.MONGO_URI) {
        throw new Error('FAILED: MONGO_URI NOT DEFINED IN .ENV :(');
    }
    // MONGODB OPTIONS 
    const mongodbOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    // CHECK IF NO URI PROVIDED 
    if (typeof URI === "string" && URI !== null) {
        try {
            await mongoose.connect(URI, mongodbOptions, (err) => {
                if (err) {
                    console.log(err.message);
                    console.log('DB Failed To Connect :(');
                } else {
                    console.log('DB CONNECTED SUCCESSFULLY 100%')
                }
            })
        } catch (err) {
            console.log(err.message);
            //next(err);
            process.exit(1)
        }
    }
};

// EXPORT CONNECTION MODULE
module.exports = dbConnection;