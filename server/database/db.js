import mongoose,{ connect } from 'mongoose';


const connection = async (username, password) => {
    
    // enter mongodb connection string here
    const URL = ``;

    try{
        await mongoose.connect(URL);
        console.log('Database connected successfully');
    }catch(error){
        console.log('Error while connecting to the database', error);
    }
}

export default connection;