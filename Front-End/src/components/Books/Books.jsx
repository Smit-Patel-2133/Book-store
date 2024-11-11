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
    const [categories] = useState([
        "Fantasy", "Young Adult", "Fiction", "Magic", "Children's", "Adventure", "Audiobook", "Middle Grade", "Classics",
        "Science Fiction Fantasy", "Romance", "Vampires", "Paranormal", "Paranormal Romance", "Supernatural", "Teen",
        "Urban Fantasy", "Historical Fiction", "Historical", "War", "Holocaust", "World War II", "Books About Books",
        "Dystopia", "Literature", "Politics", "School", "Science Fiction", "Novels", "Read For School", "Civil War",
        "Historical Romance", "Picture Books", "Poetry", "Juvenile", "Kids", "Short Stories", "Gothic", "19th Century",
        "Classic Literature", "British Literature", "Thriller", "Mystery", "Crime", "Horror", "Suspense", "Self-Help",
        "Biography", "Autobiography", "Memoir", "Psychology", "Philosophy", "Religion", "Spirituality", "Travel", "Cooking",
        "Health and Wellness", "Business", "Economics", "Entrepreneurship", "Technology", "Programming", "Graphic Novels",
        "Comics", "Drama", "Essays", "Humor", "Anthology", "True Crime", "Contemporary", "Women's Fiction", "LGBTQ+",
        "Family", "Friendship", "Parenting", "Nature", "Environment", "Science", "Astronomy", "Physics", "Mathematics",
        "Engineering", "Art", "Photography", "Music", "Performing Arts", "Architecture", "Animals", "Gardening", "Sports",
        "Fitness", "Hobbies", "Crafts", "Home Improvement", "Education", "Law", "Political Science"
    ]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTriggered, setSearchTriggered] = useState(false);
    const booksPerPage = 20;
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart.cart);

    useEffect(() => {
        if (!searchTriggered) {  // Only fetch books if no search was triggered
            fetchBooks();
        }
    }, [selectedGenres]);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/api/books', {
                params: {
                    genres: selectedGenres.length ? selectedGenres : undefined,
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
    };

    const handleGenreChange = (genre) => {
        setSelectedGenres((prevSelectedGenres) =>
            prevSelectedGenres.includes(genre)
                ? prevSelectedGenres.filter((g) => g !== genre)
                : [...prevSelectedGenres, genre]
        );
        setCurrentPage(1);
    };

    const handleSearch = async () => {
        if (!searchTerm) return;
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/rec', {
                params: { name: searchTerm }
            });
            setBooksData(response.data);  // Set recommendations as booksData
            console.log("Updated booksData with recommendations:", response.data);
        } catch (err) {
            console.log(err);
        } finally {
            setSearchTriggered(false);  // Reset search trigger after setting data
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
        selectedGenres.length
            ? selectedGenres.some((genre) => book.genres.includes(genre))
            : true
    );

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    return (
        <>
            <NavigationBar />
            <div className="main-container">
                <SearchBar
                    genres={categories}
                    selectedGenres={selectedGenres}
                    onGenreChange={handleGenreChange}
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
