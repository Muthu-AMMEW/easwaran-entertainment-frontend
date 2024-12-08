import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/Auth";
import ProductCard from '../components/ProductCard';
import { useSearchParams } from 'react-router-dom';
import { GetProductsApi } from "../services/Api";
// import './Home.css';


export default function Home() {

    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (isAuthenticated()) {
            GetProductsApi(searchParams).then(res => setProducts(res.data.products))
        }
    }, [searchParams])

    if (!isAuthenticated()) {
        //redirect user to login
        return <Navigate to="/login" />
    }

    return (
        <>
            <h1 id="products_heading" className="text-decoration-underline text-center mt-3">Latest Food Items</h1>

            <section id="products" className="container mt-2">
                <div className="row">
                    {products.map((product) => <ProductCard key={product._id} product={product} />)}
                </div>
            </section>
        </>
    )
}