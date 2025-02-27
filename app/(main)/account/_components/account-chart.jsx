"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatCurrency } from '@/lib/utils';
import { endOfDay, format, startOfDay, subDays } from 'date-fns';

import React, { useMemo, useState } from 'react'
import { Area, AreaChart, Bar, 
    BarChart, 
    CartesianGrid, 
    Legend, 
    Line, 
    LineChart, 
    ResponsiveContainer, 
    Tooltip, 
    XAxis, 
    YAxis } from 'recharts'

    const DATE_RANGES = {
        "7D": { label: "Last 7 Days", days: 7 },
        "1M": { label: "Last Month", days: 30 },
        "3M": { label: "Last 3 Months", days: 90 },
        "6M": { label: "Last 6 Months", days: 180 },
        ALL: { label: "All Time", days: null },
      };

      const CHART_TYPES = {
        BAR: "Bar Chart",
        LINE: "Line Chart",
        AREA: "Area Chart",
      };
      

const AccountChart = ({transactions}) => {
    const [dateRange, setDateRange] = useState("1M");
    const [chartType, setChartType] = useState("BAR");

    const filteredData = useMemo(() => {
        const range = DATE_RANGES[dateRange];
        const now = new Date();
        const startDate = range.days
          ? startOfDay(subDays(now, range.days))
          : startOfDay(new Date(0));

      
     // Filter transactions within date range
    const filtered = transactions.filter(
      (t) => new Date(t.date) >= startDate && new Date(t.date) <= endOfDay(now)
    );
      // Group transactions by date
    const grouped = filtered.reduce((acc, transaction) => {
        const date = format(new Date(transaction.date), "MMM dd");
        if (!acc[date]) {
          acc[date] = { date, income: 0, expense: 0 };
        }
        if (transaction.type === "INCOME") {
          acc[date].income += transaction.amount;
        } else {
          acc[date].expense += transaction.amount;
        }
        return acc;
      }, {});
  
      // Convert to array and sort by date
      return Object.values(grouped).sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );
},[transactions,dateRange]);

 // Calculate totals for the selected period
 const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, day) => ({
        income: acc.income + day.income,
        expense: acc.expense + day.expense,
      }),
      { income: 0, expense: 0 }
    );
  }, [filteredData])
  
  
  return (    
<Card className="bg-white shadow-lg rounded-xl p-6">
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
    <CardTitle className="text-xl font-medium text-gray-800">
        Transaction Overview
    </CardTitle>
    <div className="flex gap-4">
          {/* Date Range Selector */}
    <Select defaultValue= {dateRange} onValueChange={setDateRange}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Select Range" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(DATE_RANGES).map(([key, { label }]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
      </SelectContent>
    </Select>
    {/* Chart Type Selector */}
    <Select defaultValue={chartType} onValueChange={setChartType}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Chart Type" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(CHART_TYPES).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
  </CardHeader>
  <CardContent>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
  <Card className="text-center p-4 bg-green-50 shadow-md rounded-lg">
    <CardContent>
      <p className="text-muted-foreground">Total Income</p>
      <p className="text-lg font-bold text-green-500">
      {formatCurrency(totals.income)}
      </p>
    </CardContent>
  </Card>

  <Card className="text-center p-4 bg-green-50 shadow-md rounded-lg">
    <CardContent>
      <p className="text-muted-foreground">Total Expenses</p>
      <p className="text-lg font-bold text-red-500">
      {formatCurrency(totals.expense)}
        {/* ${totals.expense.toFixed(2)} */}
      </p>
    </CardContent>
  </Card>

  <Card className="text-center p-4 bg-red-50 shadow-md rounded-lg">
    <CardContent>
      <p className="text-muted-foreground">Net</p>
      <p
        className={`text-lg font-bold ${
          totals.income - totals.expense >= 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        {/* ${(totals.income - totals.expense).toFixed(2)} */}
        {formatCurrency(totals.income - totals.expense)}
      </p>
    </CardContent>
  </Card>
</div>

    
        <div className="h-[300px] bg-gray-50 rounded-lg shadow-md">
          <ResponsiveContainer width="100%" height="100%">
          {chartType === "BAR" && (
            <BarChart
            data={filteredData}
            margin={{ top: 10, right: 10, left: 10, bottom: 0
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false}  />
            <XAxis 
                dataKey="date"
                fontSize={12}
                tickLine={false}
                axisLine={false}
            />
            <YAxis
               fontSize={12}
               tickLine={false}
               axisLine={false}
               tickFormatter={(value) => formatCurrency(value)}
            />
          <Tooltip 
              formatter={(value) => [formatCurrency(value), undefined]}
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
          />
          <Legend />
          <Bar 
             dataKey="income"
             name="Income"
             fill="#22c55e"
             radius={[4, 4, 0, 0]}
          />
          <Bar  dataKey="expense"
                name="Expense"
                fill="#ef4444"
                radius={[4, 4, 0, 0]} />
        </BarChart>
       )}
       {chartType === "LINE" && (
        <LineChart data={filteredData}
                   margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => formatCurrency(value)} />   {/* `$${value}`*/}
            <Tooltip formatter={(value) => [formatCurrency(value), undefined]} />
            <Legend />
        <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={2} />
        <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2}/>

        </LineChart>
       )}

            {chartType === "AREA" && (
              <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip formatter={(value) => [formatCurrency(value), undefined]} />
                <Legend />
                <Area type="monotone" dataKey="income" stroke="#22c55e" fill="#bbf7d0" />
                <Area type="monotone" dataKey="expense" stroke="#ef4444" fill="#fecaca" />
              </AreaChart>
            )}
      </ResponsiveContainer>
      </div>
  </CardContent>
</Card>
  )
}

export default AccountChart