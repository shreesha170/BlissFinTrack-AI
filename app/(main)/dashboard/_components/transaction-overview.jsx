"use client";
 
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn} from '@/lib/utils';
import { format } from 'date-fns';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import React, { useState } from 'react'
import { Cell, Legend, Pie, PieChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip } from 'recharts';

// const COLORS = [
//     "#FF6B6B",
//     "#4ECDC4",
//     "#45B7D1",
//     "#96CEB4",
//     "#FFEEAD",
//     "#D4A5A5",
//     "#9FA8DA",
//   ];

const COLORS = [
  "#1E88E5", // Rich Blue - Represents stability & trust
  "#43A047", // Vibrant Green - Growth, profit
  "#FDD835", // Gold - Wealth & prosperity
  "#E53935", // Bright Red - Expenses & warnings
  "#8E24AA", // Deep Purple - Premium & finance-related
  "#FF6F00", // Orange - Active & energetic spending
  "#26C6DA", // Teal - Modern & tech-friendly
  "#6D4C41", // Brown - Essential needs & utilities
  "#D81B60", // Pink - Luxury & discretionary spending
];

  
 const DashboardOverview = ({accounts, transactions}) => {
    

    const [selectedAccountId, setSelectedAccountId] = useState(
        accounts.find((a) => a.isDefault)?.id || accounts[0]?.id
      );
    const [selectedChart, setSelectedChart] = useState("pie");
    
    const accountTransactions = transactions.filter(
       (t) => t.accountId === selectedAccountId
    );

    const recentTransactions = accountTransactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

    const currentDate = new Date();
    const currentMonthExpenses = accountTransactions.filter((t) => {
        const transactionDate = new Date(t.date);
        return (
            t.type === "EXPENSE" &&
            transactionDate.getMonth() === currentDate.getMonth() &&
            transactionDate.getFullYear() === currentDate.getFullYear()
        );
    });

    const expensesByCategory = currentMonthExpenses.reduce((acc, transaction) => {
        const category = transaction.category;
        if (!acc[category]) {
            acc[category] = 0;
        }
        acc[category] += transaction.amount;
        return acc;
    }, {});

    const pieChartData = Object.entries(expensesByCategory).map(
        ([category, amount]) => ({ name: category, value: amount })
    );

    const radialBarData = pieChartData.map((entry, index) => ({
        name: entry.name,
        value: entry.value,
        fill: COLORS[index % COLORS.length],
    }));

    const radarData = pieChartData.map((entry) => ({
        category: entry.name,
        expense: entry.value,
    }));
    
    return (
        <div className="grid gap-4 md:grid-cols-2">
            {/* Recent Transactions Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-base font-normal">
            Recent Transactions
          </CardTitle>
          <Select
            value={selectedAccountId}
            onValueChange={setSelectedAccountId}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  {account.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No recent transactions
              </p>
            ) : (
              recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {transaction.description || "Untitled Transaction"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(transaction.date), "PP")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "flex items-center",
                        transaction.type === "EXPENSE"
                          ? "text-red-500"
                          : "text-green-500"
                      )}
                    >
                      {transaction.type === "EXPENSE" ? (
                        <ArrowDownRight className="mr-1 h-4 w-4" />
                      ) : (
                        <ArrowUpRight className="mr-1 h-4 w-4" />
                      )}
                      {/* ${transaction.amount.toFixed(2)} */}
                      ₹{transaction.amount.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-base font-normal">
                    Monthly Expense Breakdown
                    </CardTitle>
                    <Select value={selectedChart} onValueChange={setSelectedChart}>
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Select chart" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pie">Pie Chart</SelectItem>
                            <SelectItem value="radial">Radial Bar Chart</SelectItem>
                            <SelectItem value="radar">Radar Chart</SelectItem>
                        </SelectContent>
                    </Select>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        {selectedChart === "pie" && (
                            <PieChart>
                            <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, value }) => `${name}: ₹${(value ?? 0).toFixed(2)}`}
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value, name) => [`₹${(value ?? 0).toFixed(2)}`, name]} />
                            <Legend />
                        </PieChart>
                        
                        )}
                        {selectedChart === "radial" && (
                            <RadialBarChart 
                            cx="50%" 
                            cy="50%" 
                            innerRadius="20%" 
                            outerRadius="90%" 
                            barSize={15} 
                            data={radialBarData}
                        >
                            <RadialBar 
                                minAngle={15} 
                                label={{ position: "insideStart", fill: "#fff", fontSize: 14 }} 
                                background 
                                dataKey="value" 
                                fill="#43A047"
                            />
                            <Tooltip contentStyle={{ backgroundColor: "#1E1E2F", color: "#FFF", borderRadius: "10px" }} />
                            <Legend verticalAlign="bottom" iconSize={12} />
                        </RadialBarChart>
                    )}
        
                    {selectedChart === "radar" && (
                        <RadarChart outerRadius={100} data={radarData}>
                            <PolarGrid stroke="#C1C1C1" strokeDasharray="3 3" />
                            <PolarAngleAxis dataKey="category" tick={{ fill: "#fff", fontSize: 12 }} />
                            <PolarRadiusAxis stroke="#ddd" tick={{ fill: "#ddd", fontSize: 10 }} />
                            <Radar 
                                name="Expenses" 
                                dataKey="expense" 
                                stroke="#1E88E5" 
                                fill="#1E88E5" 
                                fillOpacity={0.7} 
                            />
                            <Tooltip contentStyle={{ backgroundColor: "#1E1E2F", color: "#FFF", borderRadius: "10px" }} />
                            <Legend verticalAlign="top" iconSize={12} />
                        </RadarChart>
                        )}
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
};

export default DashboardOverview;
