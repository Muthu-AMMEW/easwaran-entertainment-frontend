import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserDetailsApi, M_UserDetailsApi, CreateOrderApi } from "../services/Api";
import { isAuthenticated } from "../services/Auth";
import { Navigate } from "react-router-dom";

export default function Cart({ cartItems, setCartItems }) {
    const [complete, setComplete] = useState(false);
    const [user, setUser] = useState({ fullName: "", email: "", pno: "", address: "", localId: "" });
    const order = { user: user, cartItems: cartItems };


    useEffect(() => {
        if (isAuthenticated()) {
            UserDetailsApi().then((response) => {
                setUser(values => ({
                    ...values,
                    localId: response.data.users[0].localId
                }))
            })
        }
    }, [])

    useEffect(() => {
        if (isAuthenticated() && user.localId) {
            M_UserDetailsApi(user.localId).then((response) => {
                setUser(values => ({
                    ...values,
                    fullName: response.data.user[0].fullName,
                    email: response.data.user[0].email,
                    pno: response.data.user[0].pno,
                    address: response.data.user[0].address
                }));
            })
        }
    }, [user.localId])

    function increaseQty(item) {
        if (item.product.stock === item.qty) {
            return;
        }
        const updatedItems = cartItems.map((i) => {
            if (i.product._id === item.product._id) {
                i.qty++
            }
            return i;
        })
        setCartItems(updatedItems)
    }

    function decreaseQty(item) {
        if (item.qty > 1) {
            const updatedItems = cartItems.map((i) => {
                if (i.product._id === item.product._id) {
                    i.qty--
                }
                return i;
            })
            setCartItems(updatedItems)
        }
    }

    function removeItem(item) {
        const updatedItems = cartItems.filter((i) => {
            if (i.product._id !== item.product._id) {
                return true;
            }
            return false;
        })
        setCartItems(updatedItems);
        toast.success("Item Removed");
    }



    function placeOrderHandler() {
        try {
            CreateOrderApi(order);
            setCartItems([]);
            toast.success("Order Success!");
        } catch (err) {
            console.log(err)
        } finally {
            setComplete(true);
        }
    }

    if (!isAuthenticated()) {
        //redirect user to login
        return <Navigate to="/login" />
    }

    return cartItems.length > 0 ? <>
        <div className="container-fluid p-3">
            <div className="row">
                <h2 className="mt-5 text-center">Your Cart: <b>{cartItems.length} items</b></h2>
                <div className="col-12 col-lg-9">
                    {cartItems.map((item) =>
                    (<div key={item.product._id}>
                        <hr />
                        <div className="cart-item">
                            <div className="row">
                                <div className="col-6 col-lg-3 text-center">
                                    <img src={item.product.images[0].image} alt={item.product.name} height="90" width="115" />
                                </div>

                                <div className='col-6 col-lg-9'>
                                    <div className="row d-flex flex-column flex-lg-row justify-content-center align-items-center">
                                        <h6 className="col text-center m-2">
                                            <Link className='text-black' to={"/product/" + item.product._id} >{item.product.name}</Link>
                                        </h6>

                                        <div className="col text-center m-2">
                                            <h5>Rs. {item.product.price}</h5>
                                        </div>

                                        <div className="col text-center m-2">
                                            <div className="d-flex justify-content-evenly">
                                                <span className="btn btn-danger" onClick={() => decreaseQty(item)}>-</span>
                                                <input type="number" className="text-center w-25" name="qty" value={item.qty} readOnly />

                                                <span className="btn btn-primary" onClick={() => increaseQty(item)}>+</span>
                                            </div>
                                        </div>

                                        <div className="col text-center m-3">
                                            <span onClick={() => removeItem(item)}><i className="fa fa-trash btn btn-danger"></i></span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>)
                    )}

                </div>

                <div className="col-12 col-lg-3 my-5 text-center">
                    <div className='border rounded-5 p-5'>
                        <h4>Order Summary</h4>
                        <hr />
                        <h6 className='m-4'>Subtotal:  <span className='text-danger'>{cartItems.reduce((acc, item) => (acc + item.qty), 0)} (Units)</span></h6>
                        <h6 className='m-4'>Est. total: <span className='text-danger'>Rs. {Number(cartItems.reduce((acc, item) => (acc + item.product.price * item.qty), 0)).toFixed(2)}</span></h6>

                        <hr />
                        <button onClick={placeOrderHandler} className="btn btn-success">Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    </> : (!complete ? <h2 className='m-5 p-5 text-center'>Your Cart is Empty!</h2>
        : <div className='m-5 p-5 text-center'>
            <h2>Order Complete!</h2>
            <p>Your order has been placed succesfully.</p>
        </div>)
}