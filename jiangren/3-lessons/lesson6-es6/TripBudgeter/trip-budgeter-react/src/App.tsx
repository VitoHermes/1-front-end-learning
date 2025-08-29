import { useCallback, useEffect, useState } from 'react';
import './App.scss';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';
import Filters from './components/Filters';

export type Category =
  | 'Transport'
  | 'Food'
  | 'Lodging'
  | 'Entertainment'
  | 'Other';

export interface Expense {
  id: string;
  title: string;
  category: Category;
  amount: number;
  date?: string;
}

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | Category>(
    'All'
  );

  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const applyFilters = useCallback(() => {
    const filtered = expenses.filter(expense => {
      const matchesCategory =
        selectedCategory === 'All' || expense.category === selectedCategory;
      const matchesSearch = expense.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredExpenses(filtered);
  }, [expenses, selectedCategory, searchTerm]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const addExpense = (newExpense: Omit<Expense, 'id'>): void => {
    const id =
      (window.crypto as Crypto | undefined)?.randomUUID?.() ??
      String(Date.now()) + Math.random().toString(16).slice(2);
    const expense: Expense = { ...newExpense, id };
    setExpenses(prev => [...prev, expense]);
  };

  const removeExpense = (id: string): void => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const sortByAmount = (): void => {
    setExpenses(prev => [...prev].sort((a, b) => b.amount - a.amount));
  };

  const sortByDate = (): void => {
    setExpenses(prev =>
      [...prev].sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    );
  };

  const loadInitialData = (): void => {
    const initialData: Omit<Expense, 'id'>[] = [
      {
        title: 'Metro Card',
        category: 'Transport',
        amount: 25.0,
        date: '2025-08-10',
      },
      {
        title: 'Street Tacos',
        category: 'Food',
        amount: 12.5,
        date: '2025-08-11',
      },
      {
        title: 'Hotel Night',
        category: 'Lodging',
        amount: 145.0,
        date: '2025-08-11',
      },
      {
        title: 'Museum Ticket',
        category: 'Entertainment',
        amount: 18.0,
        date: '2025-08-12',
      },
      { title: 'Coffee', category: 'Food', amount: 4.2, date: '2025-08-12' },
      {
        title: 'Taxi',
        category: 'Transport',
        amount: 32.0,
        date: '2025-08-12',
      },
    ];

    const withIds: Expense[] = initialData.map(item => ({
      ...item,
      id:
        (window.crypto as Crypto | undefined)?.randomUUID?.() ??
        String(Date.now()) + Math.random().toString(16).slice(2),
    }));

    setExpenses(withIds);
  };

  const clearFilters = (): void => {
    setSearchTerm('');
    setSelectedCategory('All');
  };

  return (
    <div className="App">
      <header className="site-header">
        <h1>Trip Budgeter</h1>
      </header>

      <main className="container">
        <AddExpenseForm
          onAddExpense={addExpense}
          onLoadData={loadInitialData}
        />

        <Filters
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
          onClear={clearFilters}
        />

        <ExpenseList
          expenses={filteredExpenses}
          totalAmount={totalAmount}
          onRemoveExpense={removeExpense}
          onSortByAmount={sortByAmount}
          onSortByDate={sortByDate}
        />
      </main>
    </div>
  );
}

export default App;
