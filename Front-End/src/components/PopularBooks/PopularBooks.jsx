import { NavLink } from "react-router-dom";
import './PopularBooks.css'


const PopularBooks = () => {
    const books = [
      { title: 'Book 1', img: 'https://via.placeholder.com/200' },
      { title: 'Book 2', img: 'https://via.placeholder.com/200' },
      { title: 'Book 3', img: 'https://via.placeholder.com/200' },
      { title: 'Book 4', img: 'https://via.placeholder.com/200' },
      { title: 'Book 1', img: 'https://via.placeholder.com/200' },
      { title: 'Book 2', img: 'https://via.placeholder.com/200' },
      { title: 'Book 3', img: 'https://via.placeholder.com/200' },
      { title: 'Book 4', img: 'https://via.placeholder.com/200' }
    ];
  
    return (
      <div className="popular-books">
        <h2>Popular Books</h2>
        <div className="book-slider">
          {books.map((book, index) => (
            <div key={index} className="book-card">
              <img src={book.img} alt={book.title} />
              <h3>{book.title}</h3>
              <NavLink to={`/books/${index}`}>View Details</NavLink>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default PopularBooks;
  