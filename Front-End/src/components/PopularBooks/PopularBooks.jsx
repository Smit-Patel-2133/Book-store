import { NavLink } from "react-router-dom";
import './PopularBooks.css';

const PopularBooks = () => {
    const books = [
      { title: 'Book 1', img: 'https://images.unsplash.com/photo-1414124488080-0188dcbb8834?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGJvb2t8ZW58MHx8MHx8fDA%3D' },
      { title: 'Book 2', img: 'https://images.unsplash.com/photo-1414124488080-0188dcbb8834?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGJvb2t8ZW58MHx8MHx8fDA%3D' },
      { title: 'Book 3', img: 'https://images.unsplash.com/photo-1414124488080-0188dcbb8834?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGJvb2t8ZW58MHx8MHx8fDA%3D' },
      { title: 'Book 4', img: 'https://images.unsplash.com/photo-1414124488080-0188dcbb8834?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGJvb2t8ZW58MHx8MHx8fDA%3D' },
      { title: 'Book 5', img: 'https://images.unsplash.com/photo-1414124488080-0188dcbb8834?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGJvb2t8ZW58MHx8MHx8fDA%3D' },
      { title: 'Book 6', img: 'https://images.unsplash.com/photo-1414124488080-0188dcbb8834?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGJvb2t8ZW58MHx8MHx8fDA%3D' },
    ];
  
    return (
      <div className="popular-books-section">
        <h2 className="section-title">Popular Books</h2>
        
        <div className="book-slider-container">
          {books.map((book, index) => (
            <div key={index} className="book-card">
              <img src={book.img} alt={book.title} className="book-image" />
              <h3 className="book-title">{book.title}</h3>
              <NavLink to={`/books/${index}`} className="book-details-link">View Details</NavLink>
            </div>
          ))}
        </div>
      </div>
    );
};

export default PopularBooks;
