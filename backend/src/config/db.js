import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

mongoose.connection.on("connected", () => {
  console.log("MongoDB is successfully connected");
});

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});
