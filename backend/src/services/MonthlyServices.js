import { Budget } from '../models/monthlyBudget.js';

export const fetchBudget=async()=>{
return await Budget.find({}).lean();
}

export const add=async(budget)=>{
    const {amount,month,category}=budget;
    const monthlyBudgetData=new Budget({amount,month,category}); 
     return monthlyBudgetData.save();
}

export const deleteBudget=async(id)=>{
    return await Budget.findByIdAndDelete(id);
}

export const update=async(id,updateBudget)=>{
    const {amount,month,category}=updateBudget;
    const updateField={};
    
    if(amount!== undefined) updateField.amount=amount;
    if(month !== undefined) updateField.month=month;
    if(category!==undefined) updateField.category=category;
    return await Budget.findByIdAndUpdate(id,{ $set: updateField },
    { new: true, runValidators: true }
  ).lean();
}

export const findBudgetById=async(id)=>{
    return await Budget.findById(id).lean();
}