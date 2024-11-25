import { useEffect, useState } from "react"
import { useNavigate, Navigate } from "react-router-dom"

import { UserDetailsApi } from "../services/Api"
import { isAuthenticated } from "../services/Auth"
import ProductCard from '../components/ProductCard'
import { useSearchParams } from 'react-router-dom';
// import './Dashboard.css';


export default function DashboardPage() {
    const [user, setUser] = useState({ name: "", email: "", localId: "" })

    useEffect(() => {
        if (isAuthenticated()) {
            UserDetailsApi().then((response) => {

                setUser({
                    name: response.data.users[0].displayName,
                    email: response.data.users[0].email,
                    localId: response.data.users[0].localId,
                })
            })
        }
    }, [])



    const [products, setProducts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + '/products?' + searchParams)
            .then(res => res.json())
            .then(res => setProducts(res.products))
    }, [searchParams])


    if (!isAuthenticated()) {
        //redirect user to dashboard
        return <Navigate to="/login" />
    }

    return (
        <>
            <main role="main" className="container mt-5">
                <div className="container">
                    <div className="text-center mt-5">
                        <h3>Dashboard page</h3>
                        {user.name && user.email && user.localId ?
                            (<div>
                                <p className="text-bold " >Hi {user.name}, your Firebase ID is {user.localId}</p>
                                <p>Your email is {user.email}</p>
                            </div>)
                            : <p>Loading...</p>
                        }
                    </div>
                </div>
            </main>
            <h1 id="products_heading">Latest Products</h1>

            <section id="products" className="container mt-5">
                <div className="row">
                    {products.map((product,keyst) => <ProductCard product={product} />)}
                </div>
            </section>
        </>
    )
}