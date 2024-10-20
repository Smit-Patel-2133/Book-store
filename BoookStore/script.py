import nltk
nltk.download('stopwords')
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re
from nltk.corpus import stopwords

# Initialize NLTK stop words
stop_words = set(stopwords.words('english'))

# MongoDB connection
client = MongoClient('mongodb+srv://smit02042004:TObFfwtBpduoy170@authentication.nrgs5.mongodb.net/?retryWrites=true&w=majority&appName=Authentication')
db = client['userDatabase']
collection = db['books_info']

app = Flask(__name__)
CORS(app)

def remove_stop_words(text):
    """Remove stop words from the input text."""
    words = re.findall(r'\b\w+\b', text.lower())
    return ' '.join(word for word in words if word not in stop_words)

def create_combined_features(book, description_weight=3, setting_weight=2):
    """Combine relevant features of a book into a single string."""
    title = book.get('title', '')
    author = book.get('author', '')
    description = remove_stop_words(book.get('description', ''))
    setting = remove_stop_words(book.get('setting', ''))

    combined_features = (
            f"{description} " * description_weight +
            f"{title} " +
            f"{author} " +
            f"{setting} " * setting_weight
    )
    return combined_features.strip()

def get_recommendations(book_title):
    """Fetch recommendations based on the input book title."""
    # Search for the book by title to include it in the result
    searched_book = collection.find_one({"title": {"$regex": book_title, "$options": "i"}})
    if not searched_book:
        return {"error": "Book not found"}

    # Fetch all relevant book data from the database
    books = list(collection.find({}, {
        "_id": 1,
        "title": 1,
        "author": 1,
        "description": 1,
        "language": 1,
        "awards": 1,
        "publisher": 1,
        "setting": 1,
        "characters": 1,
        "genres": 1,
        "main_genre": 1,
        "rating": 1,
        "likes": 1,
        "price": 1,  # Make sure to include price if it exists in the database
        "coverImg": 1,  # Make sure to include cover image if it exists
    }))

    # Create a list of combined features for all books
    combined_features = [create_combined_features(book) for book in books]

    # Add the searched book's combined features at the end
    combined_features.append(create_combined_features(searched_book))

    # Use TF-IDF Vectorizer to convert combined features into numerical vectors
    vectorizer = TfidfVectorizer().fit_transform(combined_features)
    vectors = vectorizer.toarray()

    # Calculate cosine similarity between the searched book and all other books
    cosine_sim = cosine_similarity([vectors[-1]], vectors[:-1])

    # Get indices of the top 5 most similar books
    similar_indices = cosine_sim[0].argsort()[-100:][::-1]

    # Extract the corresponding full book data for recommendations
    related_books = []
    for i in similar_indices:
        book = books[i]
        book['_id'] = str(book['_id'])  # Convert ObjectId to string
        related_books.append({
            "title": book.get('title', ''),
            "author": book.get('author', ''),
            "description": book.get('description', ''),
            "language": book.get('language', ''),
            "awards": book.get('awards', ''),
            "publisher": book.get('publisher', ''),
            "setting": book.get('setting', ''),
            "characters": book.get('characters', ''),
            "genres": book.get('genres', []),
            "main_genre": book.get('main_genre', ''),
            "rating": book.get('rating', 0),
            "likes": book.get('likes', 0),
            "price": book.get('price', 0),  # Add price if available
            "coverImg": book.get('coverImg', ''),  # Add cover image if available
        })

    return related_books


@app.route('/rec', methods=['GET'])
def recommend_books():
    """API endpoint to recommend books based on a title."""
    book_title = request.args.get('name')
    if book_title:
        recommendations = get_recommendations(book_title)
        return jsonify(recommendations)  # Return all data as in your model
    else:
        return jsonify({"error": "No book title provided"}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
