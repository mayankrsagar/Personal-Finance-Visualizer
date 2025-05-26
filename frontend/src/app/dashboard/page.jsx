'use client';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import {
  fetchAllBudget,
  fetchAllTransactions,
} from '@/apis/transactionApi';
import { TransactionList } from '@/components/TransactionList';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const COLORS = [
  'var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)',
  'var(--chart-4)', 'var(--chart-5)', 'var(--chart-6)',
  'var(--chart-7)', 'var(--chart-8)', 'var(--chart-9)'
];

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [budgets,setBudgets]=useState([]);
  const loadData = async () => {
    const { data } = await fetchAllTransactions();
    const budgetData=await fetchAllBudget();
    setBudgets(budgetData.data);
    setTransactions(data);
  };

  useEffect(() =>{loadData()}, []);

  const totalExpenses = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const totalBudget=budgets.reduce((sum,mb)=>sum+mb.amount,0);

  const breakdownMap = transactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {});

  const monthNames = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];
const budgetBreakDownMap = budgets.reduce((acc, mb) => {
  const month=new Date(mb.month).getMonth();
  acc[monthNames[month]] = (acc[monthNames[month]] || 0) + mb.amount;
  return acc;
}, {});


  const breakdownData = Object.entries(breakdownMap).map(([name, value]) => ({ name, value }));
  const budgetBreakDownData = Object.entries(budgetBreakDownMap).map(
  ([name, value]) => ({ name, value })
);
  
  const recent = [...transactions].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0,5);

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader><CardTitle>Total Expenses</CardTitle></CardHeader>
          <CardContent className="text-2xl font-semibold">₹{totalExpenses}</CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Category Breakdown</CardTitle></CardHeader>
          <CardContent className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip />
                <Pie data={breakdownData} dataKey="value" nameKey="name" outerRadius="80%">
                  {breakdownData.map((entry, idx) => (
                    <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Recent Transactions</CardTitle></CardHeader>
          <CardContent>
            <TransactionList transactionData={recent} />
          </CardContent>
        </Card>
                  <Card>
          <CardHeader><CardTitle>Total Budget</CardTitle></CardHeader>
          <CardContent className="text-2xl font-semibold">₹{totalBudget}</CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Monthly Breakdown</CardTitle></CardHeader>
          <CardContent className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip />
                <Pie data={budgetBreakDownData} dataKey="value" nameKey="name" outerRadius="80%">
                  {budgetBreakDownData.map((entry, idx) => (
                    <Cell key={new Date(entry.name).getMonth()} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>



      </div>
    </div>
  );
}
