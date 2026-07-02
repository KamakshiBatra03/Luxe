import { useState, useEffect } from 'react'
import '../css/ProductList.css'
import ProductCard from '../components/ProductCard'

function ProductList() {
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    useEffect(() => {
        fetch(`${BASEURL}/api/products/`)
            .then((response) => {
                if (!response.ok) throw new Error("failed to fetch product")
                return response.json()
            })
            .then((data) => {
                setProduct(data)
                setLoading(false)
            })
            .catch((error) => {
                setError(error.message)
                setLoading(false)
            })
    }, []);

    // Helper to assign Bento classes based on the item index
    const getBentoClass = (index) => {
        if (index === 0) return "bento-tall bento-dark";   // First item is tall/dark
        if (index === 1) return "bento-large bento-orange"; // Second item is large/orange
        if (index === 2) return "bento-wide bento-black";  // Third is wide
        return "bento-standard bento-light";               // Others are normal
    }

    if (loading) return <div className="loading-state">Loading premium products...</div>
    if (error) return <div className="error-state">Error: {error}</div>

    return (
        <div className="bento-wrapper">
            <h1 className="section-title">Exclusive Collection</h1>
            <div className="product-bento-grid">
                {product.map((p, index) => (
                    <div key={p.id} className={`bento-item ${getBentoClass(index)}`}>
                        <ProductCard product={p} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductList