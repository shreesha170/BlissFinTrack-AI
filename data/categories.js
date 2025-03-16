export const defaultCategories = [
  // Income Categories
  {
    id: "salary",
    name: "Salary",
    type: "INCOME",
    color: "#22c55e", // green-500
    icon: "Wallet",
  },
  {
    id: "investment",
    name: "Investments",
    type: "INCOME",
    color: "#0284c7", // blue-600
    icon: "ChartBar",
    subcategories: ["Dividends", "Stocks", "Bonds"]
  },
  {
    id: "interest",
    name: "Interest Earnings",
    type: "INCOME",
    color: "#f59e0b", // amber-500
    icon: "Banknote",
  },
  
  {
    id: "business",
    name: "Business Income",
    type: "INCOME",
    color: "#7c3aed", // purple-600
    icon: "Building",
    subcategories: ["Sales", "Freelancing", "Consulting"]
  },
  {
    id: "rental",
    name: "Rental Income",
    type: "INCOME",
    color: "#9333ea", // violet-600
    icon: "Home",                                                           
    subcategories: ["House Rent", "Office Rent", "Vacation Rental"]
  },
  {
    id: "fixed-deposit",
    name: "Fixed Deposit Interest",
    type: "INCOME",
    color: "#b45309", // amber-700 (brownish)
    icon: "Bank",
  },
  {
    id: "funding",
    name: "Funding",
    type: "INCOME",
    color: "#14b8a6", // teal-500
    icon: "HandHoldingDollar",
    subcategories: ["Angel Investment", "Venture Capital", "Crowdfunding"]
  },
  {
    id: "trading",
    name: "Trading",
    type: "INCOME",
    color: "#673ab7", // deep-purple-500
    icon: "ArrowTrendingUp",
    subcategories: ["Forex", "Crypto", "Stock Market"]
  },
  {
    id: "other-income",
    name: "Other Income",
    type: "INCOME",
    color: "#64748b", // slate-500
    icon: "Plus",
  },
  {
    id: "freelance_income",
    name: "Freelance Earnings",
    type: "INCOME",
    color: "linear-gradient(90deg, #38bdf8, #0284c7)", // Gradient from blue-400 to blue-600
    icon: "Briefcase",
},


  // Expense Categories
  {
    id: "food",
    name: "Food & Dining",
    type: "EXPENSE",
    color: "#10b981", // emerald-500
    icon: "Utensils",
    subcategories: ["Groceries", "Restaurants", "Cafes"]
  },
  {
    id: "Tenant Rent",
    name: "Tenant Rent",
    type: "EXPENSE",
    color: "linear-gradient(90deg, #4ade80, #16a34a)", // green-500
    icon: "Home",
    subcategories: ["Rent", "Mortgage", "Property Tax", "Maintenance"],
  },
  {
    id: "transportation",
    name: "Transportation",
    type: "EXPENSE",
    color: "#f97316", // orange-500
    icon: "Car",
    subcategories: ["Fuel", "Public Transport", "Maintenance", "Parking"],
  },
  {
    id: "payroll",
    name: "Payroll & Salaries",
    type: "EXPENSE",
    color: "linear-gradient(90deg, #f43f5e, #ef4444)", // Gradient from pink-500 to red-500
    icon: "Briefcase",
},

  {
    id: "bills",
    name: "Bills & Utilities",
    type: "EXPENSE",
    color: "#be185d", // rose-700
    icon: "CreditCard",
    subcategories: ["Electricity", "Water", "Internet"]
  },
  {
    id: "groceries",
    name: "Groceries",
    type: "EXPENSE",
    color: "#84cc16", // lime-500
    icon: "Shopping",
  },
  {
    id: "utilities",
    name: "Utilities",
    type: "EXPENSE",
    color: "#06b6d4", // cyan-500
    icon: "Zap",
    subcategories: ["Electricity", "Water", "Gas", "Internet", "Phone"],
  },
  {
    id: "emi",
    name: "EMI Payments",
    type: "EXPENSE",
    color: "#f43f5e", // rose-500
    icon: "CreditCard",
    subcategories: ["Car Loan EMI", "Home Loan EMI", "Personal Loan EMI"],
  },
  {
    id: "loans",
    name: "Loan Payments",
    type: "EXPENSE",
    color: "#6366f1", // indigo-500
    icon: "Money",
    subcategories: ["Car Loan", "Home Loan", "Education Loan", "Personal Loan"],
  },
  {
    id: "investment",
    name: "Investments",
    type: "EXPENSE",
    color: "#ec4899", // pink-500
    icon: "TrendingDown",
    subcategories: ["Stocks", "Mutual Funds", "Bonds", "Real Estate"],
  },
  {
    id: "insurance",
    name: "Insurance",
    type: "EXPENSE",
    color: "#64748b", // slate-500
    icon: "Shield",
    subcategories: ["Life Insurance", "Health Insurance", "Vehicle Insurance"],
  },
  {
    id: "education",
    name: "Education",
    type: "EXPENSE",
    color: "#92400e", // brown-600
    icon: "GraduationCap",
    subcategories: ["Tuition", "Books", "Online Courses"],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    type: "EXPENSE",
    color: "#14b8a6", // teal-500
    icon: "HeartPulse",
    subcategories: ["Medical Bills", "Dental", "Pharmacy", "Insurance"],
  },
  {
    id: "entertainment",
    name: "Entertainment",
    type: "EXPENSE",
    color: "#8b5cf6", // violet-500
    icon: "Film",
    subcategories: ["Movies", "Games", "Streaming Services"],
  },
  {
    id: "personal",
    name: "Personal Care",
    type: "EXPENSE",
    color: "#d946ef", // fuchsia-500
    icon: "Smile",
    subcategories: ["Haircut", "Gym", "Beauty"],
  },
  {
    id: "shopping",
    name: "Shopping",
    type: "EXPENSE",
    color: "#ec4899", // pink-500
    icon: "ShoppingBag",
    subcategories: ["Clothing", "Electronics", "Home Goods"],
  },
  {
    id: "travel",
    name: "Travel",
    type: "EXPENSE",
    color: "#0ea5e9", // sky-500
    icon: "Plane",
    subcategories: ["Flights", "Hotels", "Transport"],
  },
  {
    id: "marketing",
    name: "Marketing",
    type: "EXPENSE",
    color: "#ff3d00", // deep-red
    icon: "Megaphone",
    subcategories: ["Ads", "SEO", "Social Media"]
  },
  {
    id: "charity",
    name: "Charity & Donations",
    type: "EXPENSE",
    color: "#f472b6", // pink-400
    icon: "Gift",
  },
  {
    id: "subscriptions",
    name: "Subscriptions",
    type: "EXPENSE",
    color: "#eab308", // yellow-500
    icon: "Newspaper",
    subcategories: ["Streaming Services", "Gym Membership", "Magazines"],
  },
  {
    id: "other-expense",
    name: "Other Expenses",
    type: "EXPENSE",
    color: "#94a3b8", // slate-400
    icon: "MoreHorizontal",
  },
];

export const categoryColors = defaultCategories.reduce((acc, category) => {
  acc[category.id] = category.color;
  return acc;
}, {});