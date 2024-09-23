import { NavLink } from 'react-router-dom';
import './CategoriesSection.css';

const CategoriesSection = () => {
  const categories = [
    { name: 'Fiction', image: 'https://images.unsplash.com/photo-1414124488080-0188dcbb8834?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGJvb2t8ZW58MHx8MHx8fDA%3D'},
    { name: 'Non-Fiction', image: 'https://images.unsplash.com/photo-1414124488080-0188dcbb8834?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGJvb2t8ZW58MHx8MHx8fDA%3D' },
    { name: 'Science', image: 'https://images.unsplash.com/photo-1414124488080-0188dcbb8834?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGJvb2t8ZW58MHx8MHx8fDA%3D' },
    { name: 'Biographies', image: 'https://images.unsplash.com/photo-1414124488080-0188dcbb8834?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGJvb2t8ZW58MHx8MHx8fDA%3D' },
    { name: 'History', image: 'https://images.unsplash.com/photo-1414124488080-0188dcbb8834?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGJvb2t8ZW58MHx8MHx8fDA%3D' },
    { name: 'Maths', image: 'https://images.unsplash.com/photo-1414124488080-0188dcbb8834?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGJvb2t8ZW58MHx8MHx8fDA%3D' },
    { name: 'C++', image: 'https://images.unsplash.com/photo-1414124488080-0188dcbb8834?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGJvb2t8ZW58MHx8MHx8fDA%3D' },
    { name: 'Js', image: 'https://images.unsplash.com/photo-1414124488080-0188dcbb8834?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGJvb2t8ZW58MHx8MHx8fDA%3D' },
    { name: 'Python', image: 'https://images.unsplash.com/photo-1414124488080-0188dcbb8834?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGJvb2t8ZW58MHx8MHx8fDA%3D' },
  ];

  return (
    <div className="categories">
      <h2>Explore by Category</h2>
      <div className="category-slider">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <img src={category.image} alt={category.name} />
            <NavLink to={`/categories/${category.name.toLowerCase()}`} className="category-title">
              {category.name}
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
