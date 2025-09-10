import mongoose, { connect } from "mongoose";
const ConnectDBS = async (DATABASE_URL) => {
    try {
        const DB_OPTION = {
            dbName: 'chartDB',
        }
        await mongoose.connect(DATABASE_URL, DB_OPTION);
        console.log('Connection Successfull');
    }

    catch (error) {
        console.log(error.message);
    }


}
export default ConnectDBS;