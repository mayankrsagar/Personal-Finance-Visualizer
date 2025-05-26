# Personal Finance Visualizer

A simple full-stack web application to track personal finances, visualize spending trends, and manage monthly budgets.

## Features

### Stage 1: Basic Transaction Tracking

* Add, Edit, Delete transactions (amount, date, description)
* Transaction list view with responsive table
* Monthly expenses bar chart
* Form validation on frontend and backend

### Stage 2: Categories & Dashboard

* All Stage 1 features
* Predefined categories for transactions
* Category-wise pie chart
* Dashboard with summary cards:

  * Total expenses
  * Category breakdown
  * Most recent transactions

### Stage 3: Budgeting & Insights

* All Stage 2 features
* Set monthly budgets per category
* Budget vs. Actual comparison bar chart
* Simple spending insights:

  * Overall budget utilization
  * Overspent and underutilized categories
  * Top spending category

## Tech Stack

* **Frontend**: Next.js, React, shadcn/ui, Recharts, React Toastify
* **Backend**: Node.js, Express, MongoDB, Mongoose, Joi validation
* **Deployment**: MongoDB Atlas, Vercel

## Getting Started

### Prerequisites

* Node.js >= 16
* npm or yarn
* MongoDB Atlas account

### Environment Variables

Create a `.env` file in the `backend` folder with:

```
MONGO_URI=<your_mongodb_atlas_connection_string>
PORT=5000
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

* Server runs on `http://localhost:5000`
* Routes:

  * **GET** `/api/transactions` — fetch all transactions
  * **POST** `/api/transactions/add` — create transaction
  * **PATCH** `/api/transactions/update/:id` — update transaction
  * **DELETE** `/api/transactions/delete/:id` — delete transaction
  * **GET** `/api/budgets` — fetch all budgets
  * **POST** `/api/budgets/add` — create/update monthly budget
  * **PATCH** `/api/budgets/update/:id` — update a budget
  * **DELETE** `/api/budgets/delete/:id` — delete a budget

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

* App runs on `http://localhost:3000`
* Pages:

  * `/` — Transaction list with add/edit
  * `/chart` — Bar, Pie, Budget comparison charts, and insights
  * `/dashboard` — Summary cards
  * `/monthlyBudget` — Monthly budget management form

## Usage

1. **Manage Transactions**: Add, edit, and delete transactions.
2. **Manage Budgets**: Set a monthly budget per category using the budget form.
3. **Visualize**: Use the chart page to compare monthly spending versus budgets. View a pie chart for a category breakdown and spending insights.
4. **Dashboard**: Track total spending, see a category breakdown, and view recent transactions.

## License

MIT © Mayank Rambirsingh Sagar
