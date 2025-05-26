'use client';

import {
  useEffect,
  useState,
} from 'react';

import { toast } from 'react-toastify';

import {
  addTransaction,
  deleteTransaction,
  fetchAllTransactions,
  updateTransaction,
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

export default function Home() {
  const [others, setOthers] = useState({ message: '', error: '' });
  const [id, setId] = useState('');
  const [edit, setEdit] = useState(false);
  const [formValues, setFormValues] = useState(null);
  const [transactionData, setTransactionData] = useState([]);
  const [open, setOpen] = useState(false);

  const loadData = async () => {
    try {
      const { message, data } = await fetchAllTransactions();
      // setOthers({ message, error: '' });
      setTransactionData(data);
    } catch (error) {
      setOthers({ message: '', error: error.message || 'Something went wrong' });
    }
  };

  const handleAdd = async (payload) => {
    try {
      const { message } = await addTransaction(payload);
      setOthers({ message, error: '' });
      loadData();
      setOpen(false);
    } catch (error) {
      setOthers({
        message: '',
        error: error.response?.data?.error || 'Failed to add transaction',
      });
    }
  };

  const handleUpdate = async (payload) => {
    try {
      const res = await updateTransaction(id, payload);
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

  const handleFormSubmit = (data) => {
    if (edit) {
      handleUpdate(data);
    } else {
      handleAdd(data);
    }
  };

  const handleEdit = (tx) => {
    setFormValues(tx);
    setId(tx._id);
    setEdit(true);
    setOpen(true);
  };

  const handleDelete=async(id)=>{
    try {
      const {message}=await deleteTransaction(id);
      setOthers(prev =>({message,...prev}))

      loadData();
    } catch (error) {
      setOthers({
        message: '',
        error: error.response?.data?.error || 'Failed to delete Transaction',
      });
    }
  }


  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (others.message) toast.success(others.message);
    if (others.error) toast.error(others.error);

    const timer = setTimeout(() => {
      setOthers({ message: '', error: '' });
    }, 3000);

    return () => clearTimeout(timer);
  }, [others.message, others.error]);

  const chartData = transactionData.map((tx) => ({
    name: new Date(tx.date).toLocaleDateString(),
    amount: tx.amount,
  }));

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <TransactionList transactionData={transactionData} onEdit={handleEdit} onDelete={handleDelete}/>
      

      <Dialog open={open} onOpenChange={(isOpen) => {
    setOpen(isOpen);
    if (!isOpen) {
      setEdit(false);
      setFormValues(null);
      setId('');
    }
  }} >
        <DialogTrigger asChild>
          <Button className="absolute md:bottom-20 md:right-10 bottom:10 right:10" variant="default">{edit ? 'Edit Transaction' : 'Add Transaction'}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
  <DialogTitle>{edit ? 'Update Transaction' : 'New Transaction'}</DialogTitle></DialogHeader>
          <TransactionForm onSubmit={handleFormSubmit} initialValues={formValues} edit={edit} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
