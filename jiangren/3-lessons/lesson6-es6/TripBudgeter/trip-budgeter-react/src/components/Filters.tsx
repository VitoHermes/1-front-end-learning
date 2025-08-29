import React from 'react';
import type { Category } from '../App';

interface FiltersProps {
  searchTerm: string;
  selectedCategory: 'All' | Category;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: 'All' | Category) => void;
  onClear: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  searchTerm,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
  onClear,
}) => {
  return (
    <section className="card">
      <h2>Filters</h2>
      <div className="row">
        <label htmlFor="search">
          Search
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="title contains"
          />
        </label>

        <label htmlFor="category">
          Category
          <select
            name="category"
            id="category"
            value={selectedCategory}
            onChange={e => onCategoryChange(e.target.value as 'All' | Category)}
          >
            <option value="All">All</option>
            <option value="Transport">Transport</option>
            <option value="Food">Food</option>
            <option value="Lodging">Lodging</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <button className="btn" onClick={onClear}>
          Clear
        </button>
      </div>
    </section>
  );
};

export default Filters;
