# Personal Finance Visualizer

A full-stack web application to track personal finances, visualize spending trends, and manage monthly budgets.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Development Stages](#development-stages)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [License](#license)

## Project Overview

Personal Finance Visualizer helps you effortlessly monitor your financial transactions and budgets with interactive visualizations and a user-friendly interface. Whether you're tracking everyday transactions or planning monthly expenses, this application makes managing your money simpler and more insightful.

## Features

- **Transaction Management**: Seamlessly add, edit, and delete transactions with details like amount, date, and description.  
- **Budget Oversight**: Set monthly budgets per category and compare your spending against planned amounts.  
- **Interactive Data Visualizations**: Engage with dynamic charts (bar, pie, and comparison charts) that make financial trends easy to understand.  
- **Responsive Design**: Enjoy a clean, adaptive dashboard that works smoothly on both desktop and mobile devices.

## Project Structure

```plaintext
.
├── README.md
├── backend
│   ├── PersonalFinanceVisualizer.postman_collection.json
│   ├── package-lock.json
│   ├── package.json
│   └── src
│       ├── config
│       │   └── db.js
│       ├── controllers
│       │   ├── MonthlyBudgetController.js
│       │   └── TransactionControllers.js
│       ├── index.js
│       ├── middleware
│       │   ├── joiValidation.js
│       │   └── validateWithJoi.js
│       ├── models
│       │   ├── monthlyBudget.js
│       │   └── transaction.js
│       ├── routes
│       │   ├── budgetRoutes.js
│       │   └── transactionRoutes.js
│       ├── services
│       │   ├── MonthlyServices.js
│       │   └── TransactionServices.js
│       └── utils
│           └── validation.js
└── frontend
    ├── components.json
    ├── eslint.config.mjs
    ├── jsconfig.json
    ├── next.config.mjs
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.mjs
    ├── public
    └── src
        ├── apis
        │   └── transactionApi.js
        ├── app
        │   ├── chart
        │   │   └── page.jsx
        │   ├── dashboard
        │   │   └── page.jsx
        │   ├── globals.css
        │   ├── layout.js
        │   ├── monthlyBudget
        │   │   └── page.jsx
        │   └── page.js
        ├── components
        │   ├── BarChart.jsx
        │   ├── BudgetPieChart.jsx
        │   ├── Navbar.jsx
        │   ├── PieChart.jsx
        │   ├── SpendingInsights.jsx
        │   ├── TransactionForm.jsx
        │   ├── TransactionList.jsx
        │   └── ui
        │       ├── button.jsx
        │       ├── card.jsx
        │       ├── chart.jsx
        │       ├── dialog.jsx
        │       ├── input.jsx
        │       ├── label.jsx
        │       ├── menubar.jsx
        │       └── table.jsx
        ├── lib
        │   └── utils.js
        └── utils
```

## Development Stages

### Stage 1: Basic Transaction Tracking
- **CRUD Operations**: Add, edit, and delete transactions (amount, date, description).
- **Responsive Listing**: View transactions in a responsive table layout.
- **Monthly Analytics**: Visualize monthly expenses using a bar chart.
- **Form Validation**: Implement both frontend and backend validations.

### Stage 2: Categories & Dashboard
- **Categorization**: Introduce predefined categories for transactions.
- **Category Visualization**: Create a pie chart to break down expenses by category.
- **Dashboard Overview**: Display summary cards with total expenses, category breakdowns, and recent transactions.

### Stage 3: Budgeting & Insights
- **Budget Setup**: Enable users to set monthly budgets per category.
- **Comparative Analysis**: Offer a bar chart showing budget vs. actual spending.
- **Spending Insights**: Provide insights into overall budget utilization, identify overspent or underutilized categories, and spotlight top spending areas.

## Tech Stack

- **Frontend**: Next.js, React, shadcn/ui, Recharts, React Toastify.
- **Backend**: Node.js, Express, MongoDB, Mongoose, Joi (for validation).
- **Deployment**: MongoDB Atlas for database hosting and Vercel for application hosting.

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- MongoDB Atlas account

### Environment Setup

Create a `.env` file inside the `backend` folder with the following content:

```env
MONGO_URI=<your_mongodb_atlas_connection_string>
PORT=5000
```

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

- The backend server runs at: `http://localhost:5000`
- **API Endpoints**:
  - **GET** `/api/transactions` — Retrieve all transactions.
  - **POST** `/api/transactions/add` — Create a new transaction.
  - **PATCH** `/api/transactions/update/:id` — Update an existing transaction.
  - **DELETE** `/api/transactions/delete/:id` — Delete a transaction.
  - **GET** `/api/budgets` — Retrieve all budgets.
  - **POST** `/api/budgets/add` — Create or update a monthly budget.
  - **PATCH** `/api/budgets/update/:id` — Update a specific budget.
  - **DELETE** `/api/budgets/delete/:id` — Delete a budget.

### Frontend Setup

1. Change to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Launch the development server:
   ```bash
   npm run dev
   ```

- The frontend application runs at: `http://localhost:3000`
- **Key Pages**:
  - **/**: Transaction list view with add/edit functionality.
  - **/chart**: Visualizations including bar, pie, and budget comparison charts.
  - **/dashboard**: Overview dashboard featuring summary cards.
  - **/monthlyBudget**: Monthly budget management form.

## Usage

1. **Manage Transactions**: Add, edit, and delete financial transactions easily.
2. **Set Budgets**: Define monthly budgets per category and track your spending.
3. **Visualize Data**: Leverage interactive charts to analyze your spending trends.
4. **Dashboard Insights**: Quickly review total expenses, category breakdowns, and recent transaction activity.

## License

MIT © Mayank Rambirsingh Sagar

