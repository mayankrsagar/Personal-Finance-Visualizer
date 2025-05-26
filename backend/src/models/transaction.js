import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Please input the amount"],
      min: 0
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      default: Date.now 
    },
    description: {
      type: String,
      required: [true, "Write something in description"]
    },
    category:{
      type: String,
      enum:["Groceries","Rent","Utilities","Dining","Shopping",
        "Transport","Entertainment","Health","Others"],
        required:[true,"Pick any one category"],
        default:"Others",
    }
  },
  {
    timestamps: true
  }
);

export const Transaction=mongoose.models.Transaction || mongoose.model("Transaction",transactionSchema)