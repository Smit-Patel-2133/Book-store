import React, { useState } from 'react';
import axios from 'axios';
import './AddBookModal.css';

const AddBookModal = ({ onClose, onBookAdded }) => {
    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        coverImg: '',
        publishDate: '',
        publisher: '',
        genres: [],
        awards: [],
        price: '',
        pages: '',
        offer: 0,
        description: '',
    });
    const [newGenre, setNewGenre] = useState('');
    const [newAward, setNewAward] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
    };

    const handleAddGenre = () => {
        if (newGenre && !newBook.genres.includes(newGenre)) {
            setNewBook((prevBook) => ({
                ...prevBook,
                genres: [...prevBook.genres, newGenre],
            }));
            setNewGenre(''); // Clear input after adding
        }
    };

    const handleAddAward = () => {
        if (newAward && !newBook.awards.includes(newAward)) {
            setNewBook((prevBook) => ({
                ...prevBook,
                awards: [...prevBook.awards, newAward],
            }));
            setNewAward(''); // Clear input after adding
        }
    };

    const handleDeleteGenre = (index) => {
        const updatedGenres = newBook.genres.filter((_, i) => i !== index);
        setNewBook((prevBook) => ({
            ...prevBook,
            genres: updatedGenres,
        }));
    };

    const handleDeleteAward = (index) => {
        const updatedAwards = newBook.awards.filter((_, i) => i !== index);
        setNewBook((prevBook) => ({
            ...prevBook,
            awards: updatedAwards,
        }));
    };

    const handleAddBook = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/admin/books', newBook);
            onBookAdded(response.data);
            onClose();
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    return (
        <div className="add-book-modal">
            <button className="close-button" onClick={onClose}>✖</button>
            <div className="modal-content">
                <h2>Add New Book</h2>

                <h4>title</h4><input
                type="text"
                name="title"
                placeholder="Title"
                value={newBook.title}
                onChange={handleInputChange}
                className="input-field"
            />
                <h4>Author</h4><input
                type="text"
                name="author"
                placeholder="Author"
                value={newBook.author}
                onChange={handleInputChange}
                className="input-field"
            />
                <h4>coverImg</h4> <input
                type="text"
                name="coverImg"
                placeholder="Cover Image URL"
                value={newBook.coverImg}
                onChange={handleInputChange}
                className="input-field"
            /><img src={newBook.coverImg} alt="coverimg"/>
                <h4>publishDate</h4>
                <input
                    type="date"
                    name="publishDate"
                    value={newBook.publishDate}
                    onChange={handleInputChange}
                    className="input-field"
                />
                <h4>Publisher</h4><input
                type="text"
                name="publisher"
                placeholder="Publisher"
                value={newBook.publisher}
                onChange={handleInputChange}
                className="input-field"
            />
                <div className="form-group">
                    <label>Genres:</label>
                    <input
                        type="text"
                        value={newGenre}
                        onChange={(e) => setNewGenre(e.target.value)}
                        className="input-field"
                    />
                    <button onClick={handleAddGenre} className="add-button">Add Genre</button>
                    <ul>
                        {newBook.genres.map((genre, index) => (
                            <li key={index}>
                                {genre}
                                <button onClick={() => handleDeleteGenre(index)} className="remove-button">✖</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="form-group">
                    <label>Awards:</label>
                    <input
                        type="text"
                        value={newAward}
                        onChange={(e) => setNewAward(e.target.value)}
                        className="input-field"
                    />
                    <button onClick={handleAddAward} className="add-button">Add Award</button>
                    <ul>
                        {newBook.awards.map((award, index) => (
                            <li key={index}>
                                {award}
                                <button onClick={() => handleDeleteAward(index)} className="remove-button">✖</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={newBook.price}
                    onChange={handleInputChange}
                    className="input-field"
                />
                <h4>Pages</h4>
                <input
                    type="number"
                    name="pages"
                    placeholder="Pages"
                    value={newBook.pages}
                    onChange={handleInputChange}
                    className="input-field"
                />
                <h4>offer</h4>
                <input
                    type="number"
                    name="offer"
                    value={newBook.offer}
                    onChange={handleInputChange}
                    min="0"
                    max="60"
                    className="input-field"
                    placeholder="Offer (%)"
                />
                <h4>Description</h4>
                <textarea
                    name="description"
                    value={newBook.description}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Description"
                />
                <button onClick={handleAddBook} className="save-button">Add Book</button>
            </div>
        </div>
    );
};

export default AddBookModal;
