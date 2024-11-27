import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import { UserDetailsApi, M_UserDetailsApi } from "../services/Api";
import { isAuthenticated } from "../services/Auth";
import ProductCard from '../components/ProductCard';
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
// import './Dashboard.css';


export default function DashboardPage() {
    const [user, setUser] = useState({ fullName: "", email: "", pno: "", address: "", localId: "" });

    useEffect(() => {
        if (isAuthenticated()) {
            async function userDetails() {
                try {
                    const userData = await UserDetailsApi();
                    let localId = await setUser({   
                        fullName: userData.data.users[0].displayName,
                        email: userData.data.users[0].email,
                        localId: userData.data.users[0].localId,
                    })
                    const mUser = await M_UserDetailsApi(user.localId);
                    console.log(userData.data);
                    console.log(mUser.data);
                   
                } catch (err) {
                    console.log(err)
                }
            }
            userDetails();
            // UserDetailsApi().then((response) => {

            //     setUser({
            //         email: response.data.users[0].email,
            //         localId: response.data.users[0].localId,
            //     })
            // })
        }
    }, [])



    const [products, setProducts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        async function productDetails() {
            try{
                let res = axios.get(process.env.REACT_APP_API_URL + '/products?' + searchParams)
                console.log(res);
                setProducts(res.data.products)
            }catch(err){
                console.log(err)
            }
        }
        productDetails();
        // fetch(process.env.REACT_APP_API_URL + '/products?' + searchParams)
        //     .then(res => res.json())
        //     .then(res => setProducts(res.products))
    }, [])


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
                        {user.email && user.localId ?
                            (<div>
                                <p className="text-bold " >Hi {user.name}, your Firebase ID is {user.localId}</p>
                                <p>Your email is {user.email}{user.fullName}</p>
                            </div>)
                            : <p>Loading...</p>
                        }
                    </div>
                </div>
            </main>
            <h1 id="products_heading">Latest Products</h1>

            <section id="products" className="container mt-5">
                <div className="row">
                    {products.map((product, keyst) => <ProductCard product={product} />)}
                </div>
            </section>
        </>
    )
}