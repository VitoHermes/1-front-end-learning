import React, { useState } from 'react';
import type { Category, Expense } from '../App';

type ExpenseInput = {
  title: string;
  category: Category;
  amount: string;
  date: string;
};

interface AddExpenseFormProps {
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
  onLoadData: () => void;
}

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({
  onAddExpense,
  onLoadData,
}) => {
  const [formData, setFormData] = useState<ExpenseInput>({
    title: '',
    category: 'Transport',
    amount: '',
    date: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!formData.title.trim()) return;

    const base: Omit<Expense, 'id'> = {
      title: formData.title.trim(),
      category: formData.category,
      amount: Number(formData.amount) || 0,
    };
    const newExpense: Omit<Expense, 'id'> = formData.date
      ? { ...base, date: formData.date }
      : base;

    onAddExpense(newExpense);

    setFormData({
      title: '',
      category: 'Transport',
      amount: '',
      date: '',
    });
  };

  return (
    <section className="card">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="row">
          <label htmlFor="title">
            Title
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="category">
            Category
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Transport">Transport</option>
              <option value="Food">Food</option>
              <option value="Lodging">Lodging</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label htmlFor="amount">
            Amount
            <input
              id="amount"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="0.00"
              required
            />
          </label>

          <label htmlFor="date">
            Date
            <input
              id="date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="row">
          <button className="btn" type="submit">
            Add
          </button>
          <button className="btn ghost" type="button" onClick={onLoadData}>
            Load Initial Data
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddExpenseForm;
