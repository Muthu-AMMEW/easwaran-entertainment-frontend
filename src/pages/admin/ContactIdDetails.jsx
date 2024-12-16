import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { ContactIdDetailsApi } from '../../services/Api';
import { isAdmin, isAuthenticated } from '../../services/Auth';

export default function ContactIdDetails() {

    const [contact, setContact] = useState();
    const { id } = useParams();

    useEffect(() => {
        if (isAuthenticated() && isAdmin()) {
            ContactIdDetailsApi(id).then((response) => {
                setContact(response.data.contact)
            })
        }
    }, [id])

    if (!isAuthenticated() || !isAdmin()) {
        return <Navigate to="/login" />
    }


    return (contact &&
        <>
            <div className="container-fluid p-2">
                <div className='m-lg-5'>
                    <div className='m-lg-5'>
                        <div className='m-sm-5 border border-5 p-3'>
                            <h4 className='text-center text-decoration-underline m-1'>Contact ID #{contact._id}</h4>
                            <div><span className='fw-medium'>Contact Status : </span>{contact.status}</div>
                            <div><span className='fw-medium'>Name : </span>{contact.fullName}</div>
                            <div><span className='fw-medium'>Address : </span>{contact.address}</div>
                            <div><span className='fw-medium'>Phone Number : </span>{contact.pno}</div>
                            <div><span className='fw-medium'>Email Address : </span>{contact.email}</div>
                            <div><span className='fw-medium'>Date : </span>{contact.createdAt}</div>
                            <div><span className='fw-medium'>Total Amount : </span>{contact.amount} Rs</div>
                            <h5 className='text-center text-decoration-underline m-1'>Contact Items</h5>
                            <div className="cart-item my-1">
                                {contact.cartItems.map(item => (
                                    <>
                                        <hr />
                                        <div className="cart-item">
                                            <div className="row">
                                                <div className="col-6 col-lg-3 text-center">
                                                    <img src={item.video.images[0].image} alt={item.video.name} height="130" width="130" />
                                                </div>

                                                <div className='col-6 col-lg-9'>
                                                    <div className="row d-flex flex-column flex-lg-row justify-content-center align-items-center">
                                                        <h6 className="col text-center m-2">
                                                            <Link className='text-black' to={"/video/" + item.video._id} >{item.video.name}</Link>
                                                        </h6>

                                                        <div className="col text-center m-2">
                                                            <h5>Rs. {item.video.price}</h5>
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