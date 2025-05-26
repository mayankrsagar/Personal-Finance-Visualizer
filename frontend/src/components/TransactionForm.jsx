'use client';

import {
  useEffect,
  useState,
} from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CATEGORIES = [
  'Others',
  'Groceries',
  'Rent',
  'Utilities',
  'Dining',
  'Shopping',
  'Transport',
  'Entertainment',
  'Health',
];

export default function TransactionForm({
  onSubmit,
  initialValues = {},
  edit = false,
  loadBudgetData = false,
}) {
  // initialize form state
  const [formData, setFormData] = useState({
    amount:      '',
    description: '',
    date:        '',
    month:       '',
    category:    'Others',
  });
  const [errors, setErrors] = useState({});

  // sync initialValues for edit
  useEffect(() => {
    if (initialValues && initialValues.amount != null) {
      setFormData({
        amount:      initialValues.amount,
        description: initialValues.description || '',
        date:        initialValues.date
                      ? new Date(initialValues.date).toISOString().slice(0,10)
                      : '',
        month:       initialValues.month || '',
        category:    initialValues.category || 'Others',
      });
    }
  }, [initialValues]);

  // validation
  const validate = () => {
    const errs = {};
    if (!formData.amount) errs.amount = 'Amount is required';
    else if (isNaN(formData.amount)) errs.amount = 'Must be a number';

    // only validate description & date in transaction mode
    if (!loadBudgetData) {
      if (!formData.description) errs.description = 'Description is required';
      if (!formData.date)        errs.date = 'Date is required';
    } else {
      // in budget mode validate month
      if (!formData.month) errs.month = 'Month is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // build payload based on mode
    const payload = {
      amount:   parseFloat(formData.amount),
      category: formData.category,
    };

    if (loadBudgetData) {
      payload.month = formData.month;           // e.g. "2025-06"
    } else {
      payload.description = formData.description.trim();
      payload.date        = new Date(formData.date);
    }

    onSubmit(payload);

    // reset if not editing
    if (!edit) {
      setFormData({
        amount:      '',
        description: '',
        date:        '',
        month:       '',
        category:    'Others',
      });
      setErrors({});
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto p-4 border rounded-xl shadow bg-white"
    >
      {/* Amount */}
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          placeholder="Enter amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
        {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}
      </div>

      {/* Description (only for transactions) */}
      {!loadBudgetData && (
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            type="text"
            placeholder="Enter description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description}</p>
          )}
        </div>
      )}

      {/* Date or Month */}
      <div className="space-y-2">
        <Label htmlFor={loadBudgetData ? 'month' : 'date'}>
          {loadBudgetData ? 'Month' : 'Date'}
        </Label>
        <Input
          id={loadBudgetData ? 'month' : 'date'}
          type={loadBudgetData ? 'month' : 'date'}
          value={loadBudgetData ? formData.month : formData.date}
          onChange={(e) => {
            const key = loadBudgetData ? 'month' : 'date';
            setFormData({ ...formData, [key]: e.target.value });
          }}
        />
        {loadBudgetData ? (
          errors.month && <p className="text-sm text-red-500">{errors.month}</p>
        ) : (
          errors.date  && <p className="text-sm text-red-500">{errors.date}</p>
        )}
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          className="w-full px-3 py-2 border rounded"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full">
        {loadBudgetData
          ? edit
            ? 'Update Budget'
            : 'Add Budget'
          : edit
            ? 'Update Transaction'
            : 'Add Transaction'}
      </Button>
    </form>
  );
}
