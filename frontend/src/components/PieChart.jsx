'use client';

import React from 'react';

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const COLORS = {
  Groceries:      'var(--chart-1)',
  Rent:           'var(--chart-2)',
  Utilities:      'var(--chart-3)',
  Dining:         'var(--chart-4)',
  Shopping:       'var(--chart-5)',
  Transport:      'var(--chart-6)',
  Entertainment:  'var(--chart-7)',
  Health:         'var(--chart-8)',
  Others:         'var(--chart-9)',
};

export default function PieData({ transactionData }) {
  const totals = transactionData.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {});


  const chartData = Object.entries(totals).map(([category, value]) => ({
    name:  category,
    value,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending by Category (Monthly)</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius="80%"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {chartData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[entry.name] || COLORS.Others}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
