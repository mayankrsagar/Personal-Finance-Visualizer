'use client';

import React from 'react';

import {
  Bar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const BarData = ({transactionData}) => {
 

const monthlyTotals = transactionData.reduce((acc, curr) => {
    const dateObj = new Date(curr.date);
    const monthKey = dateObj.toLocaleString('default', { month: 'short', year: 'numeric' });
    acc[monthKey] = (acc[monthKey] || 0) + curr.amount;
    return acc;
  }, {});

   const chartData = Object.entries(monthlyTotals).map(([month, total]) => ({ month, total }));
 
   

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsBarChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#4f46e5" radius={[4, 4, 0, 0]} />
          </RechartsBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BarData;
