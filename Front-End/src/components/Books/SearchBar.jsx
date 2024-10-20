import React from 'react';

const SearchBar = ({ categories, selectedCategory, onCategoryChange, searchTerm, onSearchChange, onSearch }) => {
    return (
        <div className="header-group">
            <div className="browse-categories">
                <select
                    className="category-dropdown"
                    onChange={onCategoryChange}
                    value={selectedCategory}
                >
                    <option value="">Browse Categories</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <div className="search-bar">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search for books..."
                    value={searchTerm}
                    onChange={onSearchChange}
                />
                <button className="search-button" onClick={onSearch}>
                    <i className="fas fa-search"></i> Search
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
