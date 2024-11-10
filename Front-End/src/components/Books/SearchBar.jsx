import React, { useState } from 'react';

const SearchBar = ({ genres, selectedGenres, onGenreChange, searchTerm, onSearchChange, onSearch }) => {
    const [showCategories, setShowCategories] = useState(false);

    return (
        <div className="header-group">
            <div className="header-top">
                <button
                    className="category-button"
                    onClick={() => setShowCategories(!showCategories)}
                >
                    Categories
                </button>

                <div className="search-bar">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search for books..."
                        value={searchTerm}
                        onChange={onSearchChange}
                    />
                    <button className="search-button" onClick={onSearch}>
                        <i className="fas fa-search"></i><h5>Search</h5>
                    </button>
                </div>
            </div>

            {showCategories && (
                <div className="category-list">
                    {genres.map((genre) => (
                        <button
                            key={genre}
                            className={`category-item ${selectedGenres.includes(genre) ? 'active' : ''}`}
                            onClick={() => onGenreChange(genre)}
                        >
                            {genre}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
