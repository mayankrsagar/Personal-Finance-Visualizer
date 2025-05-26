import * as BudgetService from '../services/MonthlyServices.js';

export const getAllBudgets =async(req,res)=>{
try {
    const data=await BudgetService.fetchBudget();
    res.status(200).json({
        message:"Budget is successfully fetched",
        data
    })
} catch (error) {
    res.status(500).json({
        error:"Failed to fetch data"
    })
}
}

export const addBudget=async(req,res)=>{
try {
    const {amount,month,category}=req.body;
    const updatedData=await BudgetService.add({amount,month,category});
    res.status(200).json({message:"Successfully updated budget",data:updatedData});
} catch (error) {
    res.status(500).json({
        error:"Failed to add budget"
    })
}
}

export const updateBudget=async(req,res)=>{
    try {

        const {id}=req.params;
        if(!id){
           return res.status(400).json({
                error:"Please Give proper id"
            })
        }

        const existData=await BudgetService.findBudgetById(id);
        if(!existData) return res.status(404).json({error:"Please give proper Id"});
        const updatedData=await BudgetService.update(id,req.body);
        res.status(200).json({
            message:"Successfully updated the budget",
            data: updatedData
        })
    } catch (error) {
        res.status(500).json({
            error:"Failed to update budget"
        })
    }
}

export const deleteBudget=async(req,res)=>{
    try {
        const {id}=req.params;
        if(!id) return res.status(400).json({
            error:"Please provide proper id"
        });
        const existData=await BudgetService.findBudgetById(id);
        if(!existData)return res.status(404).json({
            error:"Data with this id doesn’t exist"
        })
        const deletedData=await BudgetService.deleteBudget(id);
            res.status(200).json({
                message:"Budget is successfully deleted",
                data:deletedData
            })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
    

}