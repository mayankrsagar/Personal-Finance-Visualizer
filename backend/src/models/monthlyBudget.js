import mongoose from 'mongoose';

export const monthlyBudgetSchema=new mongoose.Schema({
  month:{
    type: Date,
    required:[true,"Set Month please"]
  },
  amount:{
    type:Number,
    required:[true,"set Budget"]
  },
  category:{
      type: String,
      enum:["Groceries","Rent","Utilities","Dining","Shopping",
        "Transport","Entertainment","Health","Others"],
        required:[true,"Pick any one category"],
        default:"Others",
    }
    
})

export const Budget=mongoose.models.Budget || mongoose.model("Budget",monthlyBudgetSchema);