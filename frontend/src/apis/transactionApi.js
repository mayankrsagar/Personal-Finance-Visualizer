import axios from 'axios';

const baseUrl = "http://localhost:5000/api/transactions";

export const fetchAllTransactions = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data; // Returns { message, data } from server
  } catch (error) {
    throw error.response?.data || { error: "Network Error" };
  }
};

export const addTransaction = async (transactionData) => {
  try {
    const response = await axios.post(`${baseUrl}/add`, transactionData);
    return response.data; // Returns { message, data } from server
  } catch (error) {
    throw error.response?.data || { error: "Failed to add transaction" };
  }
};

export const deleteTransaction = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/delete/${id}`);
    return response.data; // Returns { message, data } from server
  } catch (error) {
    throw error.response?.data || { error: "Failed to delete transaction" };
  }
};

export const updateTransaction = async (id, updateData) => {
  try {
    const response = await axios.patch(`${baseUrl}/update/${id}`, updateData);
    return response.data; // Returns { message, data } from server
  } catch (error) {
    throw error.response?.data || { error: "Failed to update transaction" };
  }
};


export const fetchAllBudget=async()=>{
 try {
    const response = await axios.get(`${baseUrl}/budgets`);
    return response.data; // Returns { message, data } from server
  } catch (error) {
    throw error.response?.data || { error: "Network Error" };
  }
}

export const addBudget = async (mb) => {
  try {
    const response = await axios.post(`${baseUrl}/add/budget`, mb);
    return response.data; // Returns { message, data } from server
  } catch (error) {
    throw error.response?.data || { error: "Failed to add transaction" };
  }
};

export const updateBudget=async(id,updatedMonthlyBudgetData)=>{
  try {
    const response=await axios.patch(`${baseUrl}/update/budget/${id}`,updatedMonthlyBudgetData)
    return response.data;
  } catch (error) {
    throw error.response?.data || {error :"failed to update Budget"}
  }
}

export const deleteBudget=async(id)=>{
  try {
    const response = await axios.delete(`${baseUrl}/delete/budget/${id}`)
    return response.data;
  } catch (error) {
    throw error.response?.data|| {error:"Failed to delete Budget"}
  }
}
