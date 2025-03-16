
# BlissFinTrack - AI-Powered Finance Management Platform

## Overview
BlissFinTrack is a comprehensive AI-powered finance management platform designed to help users track their income and expenses, manage budgets, and gain valuable insights into their financial health. The application leverages artificial intelligence to categorize transactions, scan receipts, and generate personalized financial reports. Built with modern web technologies, BlissFinTrack offers a seamless and user-friendly experience on both desktop and mobile devices.
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`]
## Getting Started
>>>>>>> 9bf3d43 (commit budget alerts)

## Features
### User Management
- Secure user authentication (OAuth for Google sign-in)
- Profile management and password reset

### Account & Transaction Management
- Create, edit, and manage multiple financial accounts
- Track income and expenses with detailed transaction history
- Smart categorization of transactions using AI
- AI-powered receipt scanning and digital storage

### Budgeting & Insights
- Set budget limits for different expense categories
- Receive alerts when nearing spending limits
- Monthly AI-generated financial insights delivered via email

### Data Visualization & Analytics
- Interactive charts and graphs for financial analysis
- Expense breakdown by category, date, and account
- Trend analysis to track spending habits over time

### Security & Compliance
- Secure authentication and session management
- Rate limiting and bot protection
- Data encryption for user information and financial records

## Technologies Used
### Frontend
- [Next.js](https://nextjs.org/) - React framework for server-side rendering and static site generation
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for styling
- [ShadCN UI](https://ui.shadcn.com/) - Component library for building modern UIs

### Backend
- [Node.js](https://nodejs.org/) - JavaScript runtime environment
- [Express.js](https://expressjs.com/) - Lightweight web application framework
- [Prisma](https://www.prisma.io/) - ORM for interacting with PostgreSQL

### Database & Hosting
- [PostgreSQL](https://www.postgresql.org/) - Relational database hosted on [Supabase](https://supabase.com/)

### AI Integration
- [Gemini AI](https://ai.google.dev/) - AI-powered receipt scanning and financial insights

## Installation
### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
Create a `.env` file in the root directory and add the following variables:
```
DATABASE_URL=your_database_url
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Run database migrations
```bash
npx prisma migrate dev
```

### 4. Start the development server
```bash
npm run dev
```

### 5. Access the application
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More
**Project Description: - AI-Powered Finance Management Platform**

The "BlissFinTrack" project is a full-stack application designed to empower users in managing their personal finances effectively. Built using modern web technologies such as Next.js, Tailwind CSS, and Shad CN UI, this platform offers a sleek and responsive user interface that enhances user experience.

### Key Features:

1. **Income and Expense Tracking**: Users can seamlessly track their income and expenses across multiple bank accounts, ensuring comprehensive financial oversight.

2. **AI-Powered Budget Management**: The platform allows users to set budgets and provides email alerts when they approach their spending limits. It also offers visual representations of income and expenses over selected time periods.

3. **Smart Categorization and Receipt Scanning**: Utilizing Gemini AI, the application automatically categorizes transactions and scans receipts, simplifying the data entry process and enhancing accuracy.

4. **User Account Management**: Users can create and manage multiple accounts, with the ability to view recent transactions and categorize them by type, making it easier to analyze spending habits.

5. **Recurring Transactions**: The application supports recurring transactions, allowing users to automate regular expenses and income entries.

6. **Monthly AI Insights**: Users receive AI-generated monthly reports that provide personalized insights into their spending patterns, helping them make informed financial decisions.

7. **Data Visualization**: The platform features interactive charts and graphs that visualize financial data, enabling users to understand their financial health at a glance.

8. **Security and Performance**: The application incorporates robust security measures to protect user data and implements rate limiting to ensure efficient transaction processing.

9. **Database Management**: The backend is powered by Prisma with a PostgreSQL database hosted on Supabase, ensuring effective data management and relationships between users, accounts, transactions, and budgets.

Overall, the platform aims to provide a comprehensive, user-friendly solution for personal finance management, leveraging AI technology to enhance user experience and financial insights. 

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!


## Testing
The application includes unit and integration tests. To run the tests, use the following command:
```bash
npm test
```

## Deployment
### Deploying to Vercel
1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Run the deployment command:
   ```bash
   vercel
   ```
3. Follow the CLI instructions to configure and deploy the application.

=======
## Deploy on Vercel
This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
>>>>>>> 9bf3d43 (commit budget alerts)
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing
We welcome contributions! If you would like to contribute:
- Fork the repository
- Create a feature branch (`git checkout -b feature-name`)
- Commit your changes (`git commit -m "Add new feature"`)
- Push to the branch (`git push origin feature-name`)
- Create a pull request

---
### Happy Budgeting with BlissFinTrack! 🚀

