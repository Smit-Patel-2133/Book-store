import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const renderPaginationButtons = () => {
        let buttons = [];
        if (currentPage > 1) {
            buttons.push(
                <button key={currentPage - 1} onClick={() => onPageChange(currentPage - 1)}>
                    {currentPage - 1}
                </button>
            );
        }
        buttons.push(
            <button key={currentPage} className="active">
                {currentPage}
            </button>
        );
        if (currentPage < totalPages) {
            buttons.push(
                <button key={currentPage + 1} onClick={() => onPageChange(currentPage + 1)}>
                    {currentPage + 1}
                </button>
            );
        }
        return buttons;
    };

    return <div className="pagination">{renderPaginationButtons()}</div>;
};

export default Pagination;
