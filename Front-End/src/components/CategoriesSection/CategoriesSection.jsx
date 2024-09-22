import { NavLink } from 'react-router-dom';
import './CategoriesSection.css'

const CategoriesSection = () => {
  const categories = ['Fiction', 'Non-Fiction', 'Science', 'Biographies', 'History','Maths','C++','Js','Python'];

  return (
    <div className="categories">
      <h2>Explore by Category</h2>
      <div className="category-slider">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <img src={`https://via.placeholder.com/150?text=${category}`} alt={category} />
            <NavLink to={`/categories/${category.toLowerCase()}`} className="category-title">
              {category}
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
