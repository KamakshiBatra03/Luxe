// src/pages/CategoryView.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/CategoryView.css'; 

function CategoryView() {
  const { categoryName } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://127.0.0.1:8000/api/categories/${categoryName}/`)
      .then(res => {
        if (!res.ok) throw new Error("Category not found");
        return res.json();
      })
      .then(json => {
        setData(json); 
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [categoryName]);

  if (loading) return <div className="loader">Loading...</div>;
  if (!data) return <div className="error">Category not found.</div>;

  return (
    <div className="category-view-container">
      <div className="category-products-section">
        {/* Added specific classes for the Dark Theme titles */}
        <h1 className="category-title">{data.category.name}</h1>
        <p className="section-subtitle">Explore our {data.category.name} collection</p>
        
        <div className="product-grid">
          {data.products.length > 0 ? (
            data.products.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="product-card">
                <div className="product-image-wrapper">
                  {/* Using the template literal to ensure absolute path */}
                  <img src={`http://127.0.0.1:8000${product.image}`} alt={product.name} />
                </div>
                
                <div className="product-info">
                  <div>
                    <h3>{product.name}</h3>
                    {/* Safety check for description length */}
                    <p className="product-desc">
                      {product.description ? product.description.substring(0, 60) + "..." : "No description available."}
                    </p>
                  </div>
                  
                  {/* New row for price and button alignment */}
                  <div className="price-row">
                    <span className="product-price">${product.price}</span>
                    <button className="view-details-btn">View Details</button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="no-products">No products found in this category yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryView;