import { useState, useEffect } from "react";
import axios from "axios";
import './Books.css';
import NavigationBar from "../NavigationBar/NavigationBar.jsx";
import Footer from "../Footer/Footer.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchBar from './SearchBar';
import BooksList from './BooksList';
import Pagination from './Pagination';

const Books = () => {
    const dispatch = useDispatch();
    const userEmail = useSelector(state => state.user_info.auth.email);
    const [booksData, setBooksData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [categories] = useState(['Fiction', 'Arts and Entertainment', 'Science and Technology', 'Non-Fiction', 'Business and Economics', 'Juvenile Fiction', 'Literary Collections', 'Biography & Autobiography', 'Philosophy and Religion', 'Juvenile Nonfiction', 'Poetry', 'Miscellaneous', 'Religion', 'Social Science', 'Comics & Graphic Novels', 'Drama']);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const booksPerPage = 20;
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart.cart);

    useEffect(() => {
        fetchBooks();
    }, [selectedCategory]);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/api/books', {
                params: {
                    category: selectedCategory || undefined,
                    search: searchTerm || undefined
                }
            });
            setBooksData(response.data);
        } catch (error) {
            console.error('Failed to fetch books:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
        setSelectedCategory(''); // Clear category when searching
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setCurrentPage(1);
    };

    const handleSearch = async () => {
        if (!searchTerm) return; // Prevent search if input is empty
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/rec', {
                params: {
                    name: searchTerm
                }
            });
            setBooksData(response.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleBookClick = (book) => {
        navigate(`/books/${book.id}`, { state: { book } });
    };

    if (loading) {
        return <div>Loading books...</div>;
    }

    const filteredBooks = booksData.filter((book) =>
        (selectedCategory ? book.categories.includes(selectedCategory) : true)
    );

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    // console.log("currentBooks",currentBooks)
    return (
        <>
            <NavigationBar />
            <div className="main-container">
                <SearchBar
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                    onSearch={handleSearch}
                />
                <BooksList books={currentBooks} onBookClick={handleBookClick} />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
            <Footer />
        </>
    );
};

export default Books;
