"use client";
import React, {
  useEffect,
  useState,
} from 'react';

import { toast } from 'react-toastify';

import {
  addBudget,
  deleteBudget,
  fetchAllBudget,
  updateBudget,
} from '@/apis/transactionApi';
import TransactionForm from '@/components/TransactionForm';
import { TransactionList } from '@/components/TransactionList';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// "Groceries","Rent","Utilities","Dining","Shopping",
//         "Transport","Entertainment","Health","Others"
const MonthlyBudget = () => {
const [monthlyBudget,setMonthlyBudget]=useState({
    amount:"",
    month:"",
    category:""
})
const [others,setOthers]=useState({
    loading:null,
    message:"",
    error:null
})
const [edit,setEdit]=useState(false);
const [open,setOpen]=useState(false);
const [formValues,setFormValues]=useState(null);
const [id,setId]=useState(null);
const loadData=async()=>{
    try {
        const {data}=await fetchAllBudget();
        setMonthlyBudget(data);
    } catch (error) {
        setOthers({message:"",loading:false,error: error?.error|| 'Something went wrong'})
    }
}

  const handleDelete=async(id)=>{
    try {
      const {message}=await deleteBudget(id);
      setOthers(prev =>({message,...prev}))
      toast.success(message);
      loadData();
    } catch (error) {
      setOthers({
        message: '',
        error: error?.error || 'Failed to delete Transaction',
      });
      toast.error(error?.error);
    }
  }

  const handleUpdate = async (payload) => {
    try {
      const res = await updateBudget(id, payload);
      setOthers({ message: res.message, error: '' });
      setEdit(false);
      setId('');
      setFormValues(null);
      loadData();
      setOpen(false);
    } catch (error) {
      setOthers({
        message: '',
        error: error.response?.data?.error || 'Failed to update transaction',
      });
    }
  };


useEffect(()=>{
loadData();
},[])


  useEffect(() => {
    if (others.message) toast.success(others.message);
    if (others.error) toast.error(others.error);

    const timer = setTimeout(() => {
      setOthers({ message: '', error: '' });
    }, 3000);

    return () => clearTimeout(timer);
  }, [others.message, others.error]);

 const handleEdit = (mb) => {
    setFormValues(mb);
    setId(mb._id);
    setEdit(true);
    setOpen(true);
  };
  const handleAdd = async (payload) => {
    try {
      const { message } = await addBudget(payload);
      setOthers({ message, error: '' });
      loadData();
      setOpen(false);
    } catch (error) {
      setOthers({
        message: '',
        error: error?.error || 'Failed to add transaction',
      });
    }
  };
  const handleFormSubmit = (data) => {
    if (edit) {
      handleUpdate(data);
    } else {
      handleAdd(data);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <TransactionList transactionData={monthlyBudget} loadBudgetData onDelete={handleDelete} onEdit={handleEdit}/>
      

      <Dialog open={open} onOpenChange={(isOpen) => {
    setOpen(isOpen);
    if (!isOpen) {
      setEdit(false);
      setFormValues(null);
      setId('');
    }
  }} >
        <DialogTrigger asChild>
          <Button className="absolute md:bottom-20 md:right-10 bottom:10 right:10" variant="default">{edit ? 'Edit Budget' : 'Add Budget'}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
  <DialogTitle>{edit ? 'Update Budget' : 'New Budget'}</DialogTitle></DialogHeader>
          <TransactionForm onSubmit={handleFormSubmit} initialValues={formValues} edit={edit} loadBudgetData />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default MonthlyBudget