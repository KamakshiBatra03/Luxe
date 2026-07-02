import React from 'react';
import { Link } from 'react-router-dom';
import '../css/CategoryPage.css';
import ethnicImg from '../images/ethnicwo.jpg'
import casImg  from '../images/ff.jpg'
import workImg from '../images/ww.jpg'
import night from '../images/night.jpg'
import dress from '../images/dress.jpg'
import sport from '../images/ss.avif'
import ass from '../images/aa.avif'
import mm from '../images/mm.webp'

function CategoryPage() {
  const categories = [
    { id: 1, name: "Casuals", img:casImg , size: "tall",slug: "casuals"},
    { id: 3, name: "Ethnic Wear", img:ethnicImg , size: "wide",slug:"ethnic" },
    { id: 2, name: "Work Wear", img: workImg, size: "tall",slug:"work"},
    { id: 4, name: "Sports Wear", img:sport, size: "standard",slug:"sports" },
    { id: 5, name: "Night Wear", img: night, size: "standard" ,slug:"night"},
    { id: 6, name: "Western Wear", img: dress, size: "wide",slug:"wester" },
    { id: 7, name: "Accessories", img: ass, size: "standard",slug:"accessories" },
    { id: 8, name: "Makeup", img: mm, size: "standard",slug:"makeup" },
  ];

  return (
    <div className="category-container">
      <h1 className="pg-title">Explore Categories</h1>
      <div className="category-bento-grid">
        {categories.map((cat) => (
          <Link 
            to={`/category/${cat.slug}`} 
            key={cat.id} 
            className={`category-tile ${cat.size}`}
            style={{ backgroundImage: `url(${cat.img})` }}
          >
            <div className="tile-overlay">
              <h2>{cat.name}</h2>
              <span>View Collection →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;