import sys
import json
from pymongo import MongoClient
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# MongoDB connection
client = MongoClient('mongodb+srv://smit02042004:TObFfwtBpduoy170@authentication.nrgs5.mongodb.net/?retryWrites=true&w=majority&appName=Authentication')
db = client['userDatabase']
collection = db['books_info']

def get_recommendations(book_title):
    # Fetch all book titles from the database
    books = list(collection.find({}, {"title": 1, "authors": 1, "_id": 0}))
    
    # Add the input book to the list of books to compute similarity
    book_titles = [book['title'] for book in books] + [book_title]

    # Use TF-IDF Vectorizer to convert titles into numerical vectors
    vectorizer = TfidfVectorizer().fit_transform(book_titles)
    vectors = vectorizer.toarray()

    # Calculate cosine similarity between the book title and other books
    cosine_sim = cosine_similarity(vectors[-1], vectors[:-1])

    # Get indices of the top 200 most similar books
    similar_indices = cosine_sim.argsort()[0][-10:][::-1]

    # Extract the corresponding books
    related_books = [books[i] for i in similar_indices]

    return related_books

if __name__ == "__main__":
    # Get book title from command-line argument
    input_book_title = sys.argv[1]

    # Get recommendations
    recommended_books = get_recommendations(input_book_title)
    print(recommended_books)
    # Return the recommendations as JSON
    print(json.dumps(recommended_books))
