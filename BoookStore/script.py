import nltk
nltk.download('stopwords')

from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson import ObjectId  # Import for converting ObjectId to string
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

def remove_stop_words(text):
    # Use regex to remove non-alphanumeric characters and split into words
    words = re.findall(r'\b\w+\b', text.lower())
    # Filter out stop words
    return ' '.join(word for word in words if word not in stop_words)

def create_combined_features(book, title_weight=3, authors_weight=4, categories_weight=2, description_weight=3):
    title = book.get('title', '')
    authors = book.get('authors', '')
    categories = book.get('categories', '')
    description = remove_stop_words(book.get('description', ''))

    # Combine the relevant features into a single string with weights
    combined_features = (
        f"{description} " * description_weight +
        f"{title} " * title_weight +
        f"{authors} " * authors_weight +
        f"{categories} " * categories_weight
    )
    return combined_features.strip()  # Remove any trailing whitespace

def get_recommendations(book_title):
    # Fetch all relevant book data from the database
    books = list(collection.find({}, {
        "_id": 1,
        "title": 1,
        "authors": 1,
        "categories": 1,
        "thumbnail": 1,
        "description": 1,
        "published_year": 1,
        "average_rating": 1,
        "num_pages": 1,
        "ratings_count": 1,
        "price": 1
    }))

    # Create a list of combined features for all books
    combined_features = [create_combined_features(book) for book in books]

    # Add the input book title to combined features
    combined_features.append(book_title)

    # Use TF-IDF Vectorizer to convert combined features into numerical vectors
    vectorizer = TfidfVectorizer().fit_transform(combined_features)
    vectors = vectorizer.toarray()

    # Calculate cosine similarity between the input book and other books
    cosine_sim = cosine_similarity([vectors[-1]], vectors[:-1])

    # Get indices of the top 100 most similar books
    similar_indices = cosine_sim[0].argsort()[-100:][::-1]

    # Extract the corresponding full book data for recommendations
    related_books = []
    for i in similar_indices:
        book = books[i]
        book['_id'] = str(book['_id'])  # Convert ObjectId to string
        related_books.append(book)

    return related_books

@app.route('/rec', methods=['GET'])
def recommend_books():
    book_title = request.args.get('name')
    if book_title:
        recommendations = get_recommendations(book_title)
        return jsonify(recommendations)  # Return all data as in your model
    else:
        return jsonify({"error": "No book title provided"}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
