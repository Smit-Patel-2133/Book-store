import React, { useState } from 'react';
import './AdminBookDetail.css';
import axios from "axios";

const BookDetail = ({ book, onClose }) => {
    const [editableBook, setEditableBook] = useState({
        ...book,
        awards: book.awards || [],  // Ensure awards is an array
        genres: book.genres || [],   // Ensure genres is an array
        offer: book.offer !== undefined ? book.offer : 0, // Default offer to 0 if it does not exist
    });
    const [newAward, setNewAward] = useState('');
    const [newGenre, setNewGenre] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Ensure 'offer' field stays within 0-60 range
        if (name === "offer") {
            const offerValue = Math.max(0, Math.min(60, Number(value))); // Clamp between 0 and 60
            setEditableBook((prevBook) => ({
                ...prevBook,
                [name]: offerValue,
            }));
        } else {
            setEditableBook((prevBook) => ({
                ...prevBook,
                [name]: value,
            }));
        }
    };

    const handleAddAward = () => {
        if (newAward) {
            setEditableBook((prevBook) => ({
                ...prevBook,
                awards: [...prevBook.awards, newAward],
            }));
            setNewAward('');
        }
    };

    const handleRemoveAward = (index) => {
        setEditableBook((prevBook) => ({
            ...prevBook,
            awards: prevBook.awards.filter((_, i) => i !== index),
        }));
    };

    const handleAddGenre = () => {
        if (newGenre) {
            setEditableBook((prevBook) => ({
                ...prevBook,
                genres: [...prevBook.genres, newGenre],
            }));
            setNewGenre('');
        }
    };

    const handleRemoveGenre = (index) => {
        setEditableBook((prevBook) => ({
            ...prevBook,
            genres: prevBook.genres.filter((_, i) => i !== index),
        }));
    };

    const handleSave = async () => {
        try {
            console.log("Saving book data:", editableBook);
            const response = await axios.put(`http://localhost:3000/api/admin/books/${editableBook._id}`, editableBook);
            console.log("Saved book data:", response.data);
            onClose();
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    return (
        <div className="book-detail">
            <button className="close-button" onClick={onClose}>✖</button>
            <div className="detail-content">
                <img src={editableBook.coverImg} alt={`${editableBook.title} cover`} className="book-image" />
                <div className="details">
                    <h2>
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={editableBook.title}
                            onChange={handleInputChange}
                            className="input-field title-field"
                            placeholder="Book Title"
                        />
                    </h2>
                    <div className="form-group">
                        <label>Author:</label>
                        <input
                            type="text"
                            name="author"
                            value={editableBook.author}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <label>Cover Image URL:</label>
                        <input
                            type="text"
                            name="coverImg"
                            value={editableBook.coverImg}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <label>Publish Date:</label>
                        <input
                            type="date"
                            name="publishDate"
                            value={editableBook.publishDate.split('T')[0]}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <label>Publisher:</label>
                        <input
                            type="text"
                            name="publisher"
                            value={editableBook.publisher}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <label>Genres:</label>
                        <input
                            type="text"
                            value={newGenre}
                            onChange={(e) => setNewGenre(e.target.value)}
                            className="input-field"
                            placeholder="Add a genre"
                        />
                        <button onClick={handleAddGenre} className="add-button">Add Genre</button>
                        <ul className="list">
                            {Array.isArray(editableBook.genres) && editableBook.genres.length > 0 ? (
                                editableBook.genres.map((genre, index) => (
                                    <li key={index} className="list-item">
                                        {genre}
                                        <button onClick={() => handleRemoveGenre(index)} className="remove-button">✖</button>
                                    </li>
                                ))
                            ) : (
                                <li className="list-item">No genres added</li>
                            )}
                        </ul>
                    </div>
                    <div className="form-group">
                        <label>Awards:</label>
                        <input
                            type="text"
                            value={newAward}
                            onChange={(e) => setNewAward(e.target.value)}
                            className="input-field"
                            placeholder="Add an award"
                        />
                        <button onClick={handleAddAward} className="add-button">Add Award</button>
                        <ul className="list">
                            {Array.isArray(editableBook.awards) && editableBook.awards.length > 0 ? (
                                editableBook.awards.map((award, index) => (
                                    <li key={index} className="list-item">
                                        {award}
                                        <button onClick={() => handleRemoveAward(index)} className="remove-button">✖</button>
                                    </li>
                                ))
                            ) : (
                                <li className="list-item">No awards added</li>
                            )}
                        </ul>
                    </div>
                    <div className="form-group">
                        <label>Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={editableBook.price}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <label>Pages:</label>
                        <input
                            type="number"
                            name="pages"
                            value={editableBook.pages}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <label>Offer (0-60%):</label>
                        <input
                            type="number"
                            name="offer"
                            value={editableBook.offer}
                            onChange={handleInputChange}
                            min="0"
                            max="60"
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={editableBook.description}
                            onChange={handleInputChange}
                            className="textarea-field"
                        />
                    </div>
                    <button onClick={handleSave} className="save-button">Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
