import './Testimonials.css'

const Testimonials = () => {
    const reviews = [
      { name: 'Alice', feedback: 'Amazing collection and service!' },
      { name: 'Bob', feedback: 'Love renting books from here!' },
      { name: 'Alice', feedback: 'Amazing collection and service!' },
      { name: 'Bob', feedback: 'Love renting books from here!' },
      { name: 'Alice', feedback: 'Amazing collection and service!' },
      { name: 'Bob', feedback: 'Love renting books from here!' },
    ];
  
    return (
      <div className="testimonials">
        <h2>What Our Readers Say</h2>
        <div className="testimonial-list">
          {reviews.map((review, index) => (
            <div key={index} className="testimonial-card">
              <p>"{review.feedback}"</p>
              <h4>— {review.name}</h4>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Testimonials;