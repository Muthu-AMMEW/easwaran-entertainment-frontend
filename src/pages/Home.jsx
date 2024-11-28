import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import { UserDetailsApi, M_UserDetailsApi } from "../services/Api";
import { isAuthenticated } from "../services/Auth";
import ProductCard from '../components/ProductCard';
import { useSearchParams } from 'react-router-dom';
// import './Home.css';


export default function Home() {
    const [user, setUser] = useState({ fullName: "", email: "", pno: "", address: "", localId: "" });

    useEffect(()=>{
        if(isAuthenticated()){
            UserDetailsApi().then((response)=>{
                setUser(values => ({...values,
                    fullName:response.data.users[0].displayName,
                    email:response.data.users[0].email,
                    localId:response.data.users[0].localId
                }))
            })
        }
    },[])

    useEffect(()=>{
        if(isAuthenticated() && user.localId){
            M_UserDetailsApi(user.localId).then((response)=>{
                setUser(values => ({...values,
                    pno:response.data.user[0].pno,
                    address:response.data.user[0].address
                }));
            })
        }
    },[user.localId])

    const [products, setProducts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL+'/products?'+searchParams)
        .then(res => res.json())
        .then( res => setProducts(res.products))
    },[searchParams])


    if (!isAuthenticated()) {
        //redirect user to login
        return <Navigate to="/login" />
    }

    return (
        <>
            <main role="main" className="container mt-5">
                <div className="container">
                    <div className="text-center mt-5">
                        <h3>home page</h3>
                        {user.email && user.localId ?
                            (<div>
                                <p className="text-bold " >Hi {user.name}, your Firebase ID is {user.localId}</p>
                                <p>Your email is {user.email}{user.fullName}</p>
                                address:{user.address}
                                pno: {user.pno}
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