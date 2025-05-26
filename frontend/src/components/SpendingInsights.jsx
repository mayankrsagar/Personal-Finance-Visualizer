'use client';

import React from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function SpendingInsights({ transactionData, monthlyBudget }) {
  const thisMonth = new Date().toISOString().slice(0,7);
  const budgetsThisMonth = monthlyBudget.filter(b => b.month.startsWith(thisMonth));

  // build maps…
  const budgetMap  = Object.fromEntries(budgetsThisMonth.map(b => [b.category, b.amount]));
  const actualMap  = {};
  transactionData.forEach(t => {
    const m = new Date(t.date).toISOString().slice(0,7);
    if (m === thisMonth) {
      actualMap[t.category] = (actualMap[t.category]||0) + t.amount;
    }
  });

  const comparison = Object.keys(budgetMap).map(cat => ({
    category: cat,
    budget:    budgetMap[cat] || 0,
    actual:    actualMap[cat]   || 0,
  }));

  const totalBudget = comparison.reduce((s,c)=>s+c.budget,0);
  const totalActual = comparison.reduce((s,c)=>s+c.actual,0);
  const utilization = totalBudget
    ? Math.round((totalActual/totalBudget)*100)
    : 0;

  const overspent = comparison
    .filter(c => c.actual > c.budget)
    .map(c => `${c.category} (+${Math.round(((c.actual-c.budget)/c.budget)*100)}%)`);

  const underutilized = comparison
    .filter(c => c.actual < c.budget)
    .map(c => c.category);

  const [topCategory, topAmt] = Object.entries(actualMap)
    .sort((a,b)=>b[1]-a[1])[0] || ['',0];

  return (
    <Card>
      <CardHeader><CardTitle>Spending Insights</CardTitle></CardHeader>
      <CardContent>
        <p>You used <strong>{utilization}%</strong> of your budget this month.</p>
        {overspent.length > 0 && (
          <p>Overspent in: {overspent.join(', ')}.</p>
        )}
        {underutilized.length > 0 && (
          <p>Under budget in: {underutilized.join(', ')}.</p>
        )}
        {topCategory && (
          <p>Your top spend category: <strong>{topCategory}</strong> (₹{topAmt}).</p>
        )}
      </CardContent>
    </Card>
  );
}
