"use client";
import {
  useEffect,
  useState,
} from 'react';

import { toast } from 'react-toastify';

import {
  fetchAllBudget,
  fetchAllTransactions,
} from '@/apis/transactionApi';
import BarData from '@/components/BarChart';
import { BudgetBarChart } from '@/components/BudgetPieChart';
import PieData from '@/components/PieChart';
import { SpendingInsights } from '@/components/SpendingInsights';

const ChartPage = () => {

 const [transactionData, setTransactionData] = useState([]);
const [monthlyBudget,setMonthlyBudget]=useState([]);
  const loadData = async () => {
    try {
      
const { data: txData } = await fetchAllTransactions();
const { data: budData } = await fetchAllBudget();
setTransactionData(txData);
setMonthlyBudget(budData);
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
      toast.error(error?.error);
    }
  };

   useEffect(() => {
    loadData();
  }, []);
  

  return (
    <div>
      <SpendingInsights
  transactionData={transactionData}
  monthlyBudget={monthlyBudget}
/>
      <BarData transactionData={transactionData}/>
      <PieData transactionData={transactionData}/>
      <BudgetBarChart transactionData={transactionData} monthlyBudget={monthlyBudget}/>
    </div>
  )
}

export default ChartPage