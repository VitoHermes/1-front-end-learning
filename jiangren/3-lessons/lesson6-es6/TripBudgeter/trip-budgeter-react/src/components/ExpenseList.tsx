import React from 'react';
import type { Expense } from '../App';

interface ExpenseListProps {
  expenses: Expense[];
  totalAmount: number;
  onRemoveExpense: (id: string) => void;
  onSortByAmount: () => void;
  onSortByDate: () => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  totalAmount,
  onRemoveExpense,
  onSortByAmount,
  onSortByDate,
}) => {
  const formatCurrency = (amount: number): string => {
    return `$ ${Number(amount).toFixed(2)}`;
  };

  return (
    <section className="card list">
      <div className="list-head">
        <h2>Expenses</h2>
        <div className="right">
          <span className="pill">Total: {formatCurrency(totalAmount)}</span>
          <button className="btn tiny" onClick={onSortByAmount}>
            Sort by Amount
          </button>
          <button className="btn tiny" onClick={onSortByDate}>
            Sort by Date
          </button>
        </div>
      </div>

      <ul className="items">
        {expenses.length === 0 ? (
          <li className="empty-state">
            <div>
              No expenses found. Add some expenses or load initial data.
            </div>
          </li>
        ) : (
          expenses.map(expense => (
            <li key={expense.id}>
              <div>
                <div>
                  <div className="id">{expense.id}</div>
                  <strong>{expense.title}</strong>
                  <span className="pill">{expense.category}</span>
                </div>
                <div className="meta">{expense.date || '-'}</div>
              </div>
              <div>
                <span className="mount">{formatCurrency(expense.amount)}</span>
                <button
                  className="remove"
                  onClick={() => onRemoveExpense(expense.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </section>
  );
};

export default ExpenseList;
