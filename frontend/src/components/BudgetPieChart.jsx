'use client';

import React, { useMemo } from 'react';

import { TrendingUp } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export function BudgetBarChart({ transactionData = [], monthlyBudget = [] }) {
  const monthNames = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"];
    
  // Data processing
  const { budgetMap, expenseMap } = useMemo(() => {
    const budgetMap = monthlyBudget.reduce((acc, mb) => {
      const month = new Date(mb.month).getMonth();
      acc[month] = (acc[month] || 0) + Number(mb.amount);
      return acc;
    }, {});

    const expenseMap = transactionData.reduce((acc, tx) => {
      const month = new Date(tx.date).getMonth();
      acc[month] = (acc[month] || 0) + Number(tx.amount);
      return acc;
    }, {});

    return { budgetMap, expenseMap };
  }, [monthlyBudget, transactionData]);

  // Chart data setup
  const chartData = monthNames.map((month, index) => ({
    month,
    budget: budgetMap[index] || 0,
    expense: expenseMap[index] || 0,
  }));

  const chartConfig = {
    budget: {
      label: "Budget",
      color: "hsl(var(--chart-1))",
    },
    expense: {
      label: "Actual",
      color: "hsl(var(--chart-2))",
    },
  } ;

  // Trend calculation
  const currentMonth = new Date().getMonth();
  const currentBudget = budgetMap[currentMonth] || 0;
  const currentExpense = expenseMap[currentMonth] || 0;
  const trendPercentage = ((currentExpense - currentBudget) / currentBudget * 100).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget vs. Actual</CardTitle>
        <CardDescription>Monthly Spending Comparison</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="budget" fill="hsl(var(--chart-1))" radius={4} />
            <Bar dataKey="expense" fill="hsl(var(--chart-2))" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {trendPercentage >= 0 ? 'Over' : 'Under'} budget by {Math.abs(trendPercentage)}%
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing comparison for all months
        </div>
      </CardFooter>
    </Card>
  );
}