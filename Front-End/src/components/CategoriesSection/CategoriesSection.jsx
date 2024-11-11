import { NavLink } from 'react-router-dom';
import './CategoriesSection.css';

const CategoriesSection = () => {
  const categories = [
    { name: 'Fiction', image: 'https://th.bing.com/th?id=OIP.CjM37LtSMOC015dnkUFuigHaJH&w=225&h=277&c=8&rs=1&qlt=90&o=6&dpr=1.1&pid=3.1&rm=2'},
    { name: 'Non-Fiction', image: 'https://th.bing.com/th/id/OIP.AI5kIJS5swcXG45WuIGKqQHaE7?w=248&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7' },
    { name: 'Science', image: 'https://th.bing.com/th/id/OIP.jxdECO-_b59C7Sp9fXcVkwHaE8?w=291&h=194&c=7&r=0&o=5&dpr=1.1&pid=1.7' },
    { name: 'Biographies', image: 'https://th.bing.com/th/id/OIP.6dVqJIOqIdZym65RwRl5gwHaFi?w=236&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7' },
    { name: 'History', image: 'https://th.bing.com/th/id/OIP.hdVWXnwGj0GxwFTsOPPgiwHaHa?w=174&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7' },
    { name: 'Business and Economics', image: 'https://th.bing.com/th/id/OIP.ROE0XzW0ptEG4b1O8rLWLAHaFP?w=241&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7' },
    // { name: 'Juvenile Fiction', image: 'https://images.unsplash.com/photo-1414124488080-0188dcbb8834?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGJvb2t8ZW58MHx8MHx8fDA%3D' },
    { name: 'Literary Collections', image: 'https://th.bing.com/th/id/OIP.gDaMlraTDpXg_aGPVJl5nAAAAA?w=183&h=183&c=7&r=0&o=5&dpr=1.1&pid=1.7' },
    // { name: 'Biography & Autobiography', image: 'https://images.unsplash.com/photo-1414124488080-0188dcbb8834?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGJvb2t8ZW58MHx8MHx8fDA%3D' },
    { name: 'Philosophy and Religion', image: 'https://th.bing.com/th/id/OIP.dPEUFDSARJY6i6sH09036wHaI9?w=138&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7' },
    // { name: 'Juvenile Nonfiction', image: 'https://images.unsplash.com/photo-1414124488080-0188dcbb8834?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGJvb2t8ZW58MHx8MHx8fDA%3D' },
    { name: 'Poetry', image: 'https://th.bing.com/th/id/OIP.mIaR7uM_LfDecgc-M8Z1xgHaFZ?w=242&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7' },
    // { name: 'Comics & Graphic Novels', image: 'https://images.unsplash.com/photo-1414124488080-0188dcbb8834?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGJvb2t8ZW58MHx8MHx8fDA%3D' },
    { name: 'Religion', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/' },
    // { name: 'Miscellaneous', image: 'https://images.unsplash.com/photo-1414124488080-0188dcbb8834?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGJvb2t8ZW58MHx8MHx8fDA%3D' },
    
    // { name: 'Miscellaneous', image: 'https://images.unsplash.com/photo-1414124488080-0188dcbb8834?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGJvb2t8ZW58MHx8MHx8fDA%3D' },
    
   
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
