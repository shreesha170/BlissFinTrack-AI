"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, RefreshCw, Clock, MoreHorizontal, Search, X, CalendarIcon, Upload } from "lucide-react";
import { categoryColors } from "@/data/categories";
import { format, addMinutes, isAfter, parseISO, isBefore } from "date-fns";
import React, { useState,useMemo, useEffect } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/use-fetch";
import { bulkDeleteTransactions } from "@/actions/account";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { formatCurrency } from "@/lib/utils";
import Papa from "papaparse";

const ITEMS_PER_PAGE = 15;
const RECURRING_INTERVALS = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
};


const TransactionTable = ({ transactions}) => {
  // const [bankAccounts, setBankAccounts] = useState([]);
  const [importedTransactions, setImportedTransactions] = useState([]);
   const [selectedIds, setSelectedIds] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    field: "date",
    direction: "desc",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [recurringFilter, setRecurringFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // **Date Filters**
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const router = useRouter();
 
  const itemsPerPage = 10; // Adjust as needed

  // Memoized filtered and sorted transactions
  const filteredAndSortedTransactions = useMemo(() => {
    let result = [...transactions];

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter((transaction) =>
        transaction.description?.toLowerCase().includes(searchLower)
      );
    }

    // Apply type filter
    if (typeFilter) {
      result = result.filter((transaction) => transaction.type === typeFilter);
    }
   
    // Apply recurring filter
    if (recurringFilter) {
      result = result.filter((transaction) => {
        if (recurringFilter === "recurring") return transaction.isRecurring;
        return !transaction.isRecurring;
      });
    }
    //Aplly Date filters
    if (fromDate) {
      result = result.filter((transaction) => {
        const transactionDate = typeof transaction.date === "string" ? parseISO(transaction.date) : new Date(transaction.date);
        return isAfter(transactionDate, fromDate) || format(transactionDate, "yyyy-MM-dd") === format(fromDate, "yyyy-MM-dd");
      });
    }
    
    if (toDate) {
      result = result.filter((transaction) => {
        const transactionDate = typeof transaction.date === "string" ? parseISO(transaction.date) : new Date(transaction.date);
        return isBefore(transactionDate, toDate) || format(transactionDate, "yyyy-MM-dd") === format(toDate, "yyyy-MM-dd");
      });
    }
    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;

      switch (sortConfig.field) {
        case "date":
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case "amount":
          comparison = a.amount - b.amount;
          break;
        case "category":
          comparison = a.category.localeCompare(b.category);
          break;
        default:
          comparison = 0;
      }

      return sortConfig.direction === "asc" ? comparison : -comparison;
    });

    return result;
  }, [transactions, searchTerm, typeFilter, recurringFilter, fromDate, toDate, sortConfig]);

  
  // Pagination calculations
  const totalPages = Math.ceil(
    filteredAndSortedTransactions.length / ITEMS_PER_PAGE
  );
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedTransactions.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredAndSortedTransactions, currentPage]);
  
  const handleSort = (field) => {
    setSortConfig((current) => ({
      field,
      direction:
        current.field === field && current.direction === "asc" ? "desc" : "asc",
    }));
  };
  


  const handleSelect = (id) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds((current) =>
      current.length === filteredAndSortedTransactions.length
        ? []
        : filteredAndSortedTransactions.map((t) => t.id)
    );
  };

  const {
    loading: deleteLoading,
    fn:deleteFn,
    data: deleted,
  }=useFetch(bulkDeleteTransactions)
  
  
  const handleBulkDelete = async () => {
    if (
      !window.confirm(
        `Are you sure you want to delete ${selectedIds.length} transactions?`
      )
    )
      return;

    deleteFn(selectedIds);
  };
  useEffect(() => {
    if (deleted && !deleteLoading) {
      toast.error("Transactions deleted successfully");
    }
  }, [deleted, deleteLoading]);
  
  const handleClearFilters = () => {
    setSearchTerm("");
    setTypeFilter("");
    setRecurringFilter("");
    setFromDate(null); 
    setToDate(null); 
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setSelectedIds([]); // Clear selections on page change
  };

  const exportToCSV = () => {
    if (filteredAndSortedTransactions.length === 0) {
      toast.error("No data to export");
      return;
    }
  
    const headers = ["Date", "Description", "Amount", "Category", "Recurring"];
    const rows = filteredAndSortedTransactions.map((t) => [
      t.date,
      t.description,
      t.amount,
      t.category,
      t.isRecurring ? "Yes" : "No",
    ]);
  
    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCSVImport = (event) => {
    const file = event.target.files[0];
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const parsedTransactions = result.data.map((row, index) => ({
          id: `imported-${index}`, // Unique ID for imported transactions
          date: row.Date,
          description: row.Description,
          amount: parseFloat(row.Amount),
          category: row.Category,
          isRecurring: row.Recurring === "Yes",
        }));

        setImportedTransactions(parsedTransactions);
      },
    });
  };
    return (
      
    <div className="space-y-4">
    {deleteLoading && (
        <BarLoader className="mt-4" width={"100%"} color="#9333ea" />
    )}
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>

        <div className="flex gap-2">
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger >
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="INCOME">Income</SelectItem>
            <SelectItem value="EXPENSE">Expense</SelectItem>
          </SelectContent>
        </Select>

        
        <Select
            value={recurringFilter}
            onValueChange={(value) => {
              setRecurringFilter(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="All Transactions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recurring">Recurring Only</SelectItem>
              <SelectItem value="non-recurring">Non-recurring Only</SelectItem>
            </SelectContent>
          </Select>

           {/* Bulk Actions */}
           {selectedIds.length > 0 && (
            <div className="flex items-center gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleBulkDelete}
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete Selected ({selectedIds.length})
              </Button>
            </div>
          )}
           
          {(searchTerm || typeFilter || recurringFilter  || fromDate || toDate) && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleClearFilters}
              title="Clear filters"
            >
              <X className="h-4 w-5" />
            </Button>
          )}
        </div>
        <div className="flex gap-2">
        <Button onClick={exportToCSV} variant="outline">Export CSV</Button>
        {/* CSV Import Button */}
        {/* <input type="file" accept=".csv" onChange={handleCSVImport} className="border p-1 rounded-md" /> */}
        {/* <input type="file" accept=".csv" onChange={handleCSVImport} /> */}
        </div>
        
      </div>

      
      
      <div className="space-y-4">
        {/* Date Filters (From & To) */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[150px] justify-start text-left">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {fromDate ? format(fromDate, "PPP") : <span className="text-gray-500">From Date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={fromDate} onSelect={setFromDate} />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[150px] justify-start text-left">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {toDate ? format(toDate, "PPP") : <span className="text-gray-500">To Date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={toDate} onSelect={setToDate} />
          </PopoverContent>
        </Popover>
      </div>
      

      <div className="rounded-md border p-2">
         <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={
                    selectedIds.length === paginatedTransactions.length &&
                    paginatedTransactions.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="cursor-pointer text-left" onClick={() => handleSort("date")}>
                <div className="flex items-center">
                  Date & Time
                  {sortConfig.field === "date" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="text-left">Description</TableHead>
              <TableHead className="cursor-pointer text-left" onClick={() => handleSort("category")}>
                <div className="flex items-center">
                  Category
                  {sortConfig.field === "category" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort("amount")}>
                <div className="flex items-center justify-end">
                  Amount
                  {sortConfig.field === "amount" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="text-left">Recurring</TableHead>
              <TableHead className="w-[50px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  No Transactions Found
                </TableCell>
              </TableRow>
            ) : (
              paginatedTransactions.map((transaction, index) => {
                const actualIndex = (currentPage - 1) * itemsPerPage + index; 
                const transactionDate = addMinutes(new Date(transaction.date), actualIndex * 15);
            
                return (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <Checkbox
                        onCheckedChange={() => handleSelect(transaction.id)}
                        checked={selectedIds.includes(transaction.id)}
                      />
                    </TableCell>
                    <TableCell>{format(transactionDate, "PPpp")}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className="capitalize">
                      <span
                        style={{
                          background: categoryColors[transaction.category],
                        }}
                        className="px-2 py-1 rounded text-white text-sm"
                      >
                        {transaction.category}
                      </span>
                    </TableCell>
                    <TableCell
                      className="text-right font-medium"
                      style={{
                        color: transaction.type === "EXPENSE" ? "red" : "green",
                      }}
                    >
                      {transaction.type === "EXPENSE" ? "-" : "+"}{formatCurrency(transaction.amount.toFixed(2))}
                    </TableCell>
                    <TableCell>
                      {transaction.isRecurring ? (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Badge
                                variant="secondary"
                                className="gap-1 bg-purple-100 text-purple-700 hover:bg-purple-200"
                              >
                                <RefreshCw className="h-3 w-3" />
                                {RECURRING_INTERVALS[transaction.recurringInterval]}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-sm">
                                <div className="font-medium">Next Date:</div>
                                <div>{format(new Date(transaction.nextRecurringDate), "PPP")}</div>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        <Badge variant="outline" className="gap-1">
                          <Clock className="h-3 w-3" />
                          One-time
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                              onClick={() => 
                              router.push(
                                 `/transaction/create?edit=${transaction.id}`
                              )
                              }>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => deleteFn([transaction.id])}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table> 
         
      </div>
         {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
