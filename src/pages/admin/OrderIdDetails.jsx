import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { OrderIdDetailsApi } from '../../services/Api';
import { isAuthenticated } from '../../services/Auth';

export default function OrderIdDetails() {

    const [order, setOrder] = useState();
    const { id } = useParams();

    useEffect(() => {
        if (isAuthenticated()) {
            OrderIdDetailsApi(id).then((response) => {
                setOrder(response.data.order)
            })
        }
    }, [id])

    if (!isAuthenticated()) {
        //redirect user to login
        return <Navigate to="/login" />
    }


    return (order &&
        <>
            <div className="container-fluid p-2">
                <div className='m-lg-5'>
                    <div className='m-lg-5'>
                        <div className='m-sm-5 border border-5 p-3'>
                            <h4 className='text-center text-decoration-underline m-1'>Order ID #{order._id}</h4>
                            <div><span className='fw-medium'>Order Status : </span>{order.status}</div>
                            <div><span className='fw-medium'>Name : </span>{order.fullName}</div>
                            <div><span className='fw-medium'>Address : </span>{order.address}</div>
                            <div><span className='fw-medium'>Phone Number : </span>{order.pno}</div>
                            <div><span className='fw-medium'>Email Address : </span>{order.email}</div>
                            <div><span className='fw-medium'>Date : </span>{order.createdAt}</div>
                            <div><span className='fw-medium'>Total Amount : </span>{order.amount} Rs</div>
                            <h5 className='text-center text-decoration-underline m-1'>Order Items</h5>
                            <div className="cart-item my-1">
                                {order.cartItems.map(item => (
                                    <>
                                        <hr />
                                        <div className="cart-item">
                                            <div className="row">
                                                <div className="col-6 col-lg-3 text-center">
                                                    <img src={item.product.images[0].image} alt={item.product.name} height="130" width="130" />
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
                                                            <h6>{item.qty} Piece(s)</h6>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </>
                                ))}

                            </div>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}