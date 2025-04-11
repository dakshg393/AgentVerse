import mongoose from 'mongoose';

export async function dbConnect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on('connected', () => {
      console.log(`Mongo db connected successfully`);
    });

    connection.on('error', (err) => {
      console.log(`MongoDb Connection Error ${err}`);
      process.exit();
    });
  } catch (error) {
    console.log(`Somthing went wrong ${error}`);
    throw error;
  }
}
