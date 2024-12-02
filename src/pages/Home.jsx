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

    // useEffect(() => {
    //     fetch(process.env.REACT_APP_API_URL+'/products?'+searchParams)
    //     .then(res => res.json())
    //     .then( res => setProducts(res.products))
    // },[searchParams])

    useEffect(() => {
        GetProductsApi(searchParams).then( res => setProducts(res.data.products))
    },[searchParams])

    if (!isAuthenticated()) {
        //redirect user to login
        return <Navigate to="/login" />
    }

    return (
        <>
            <h1 id="products_heading">Latest Products</h1>

            <section id="products" className="container mt-5">
                <div className="row">
                    {products.map((product, keyst) => <ProductCard product={product} />)}
                </div>
            </section>
        </>
    )
}