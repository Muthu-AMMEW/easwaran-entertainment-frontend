import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { UserDetailsApi, ContactDetailsApi } from "../services/Api";
import { isAuthenticated } from "../services/Auth";
import { Navigate } from "react-router-dom";
export default function ContactDetails() {

    const [user, setUser] = useState({ fullName: "", email: "", localId: "" });
    const [contact, setContact] = useState();

    useEffect(() => {
        if (isAuthenticated()) {
            UserDetailsApi().then((response) => {
                setUser(values => ({
                    ...values,
                    fullName: response.data.users[0].displayName,
                    email: response.data.users[0].email,
                    localId: response.data.users[0].localId
                }))
            })
        }
    }, [])


    useEffect(() => {
        if (isAuthenticated() && user.localId) {
            ContactDetailsApi(user.localId).then((response) => {
                setContact(response.data.contact)
            })
        }
    }, [user.localId])

    if (!isAuthenticated()) {
        //redirect user to login
        return <Navigate to="/login" />
    }


    return (contact &&
        <>
            <div className="container-fluid p-2">
                <h2 className="mt-5 text-center">You placed <b>{contact.length}</b> contacts</h2>
                {contact.map((contactPart) =>
                (   
                    <div className='m-lg-5' key={contactPart._id}>
                    <div className='m-lg-5'>
                    <div className='m-sm-5 border border-5 p-3'>
                        <h4 className='text-center text-decoration-underline m-1'>Contact ID #{contactPart._id}</h4>
                        <div><span className='fw-medium'>Contact Status : </span>{contactPart.status}</div>
                        <div><span className='fw-medium'>Name : </span>{contactPart.fullName}</div>
                        <div><span className='fw-medium'>Address : </span>{contactPart.address}</div>
                        <div><span className='fw-medium'>Phone Number : </span>{contactPart.pno}</div>
                        <div><span className='fw-medium'>Email Address : </span>{contactPart.email}</div>
                        <div><span className='fw-medium'>Date : </span>{contactPart.createdAt}</div>
                        <div><span className='fw-medium'>Total Amount : </span>Rs. {contactPart.amount}</div>
                        <h5 className='text-center text-decoration-underline m-1'>Contact Items</h5>
                        <div className="cart-item my-1">
                            {contactPart.cartItems.map(item => (
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

                                                    {/* <div className="col text-center m-3">
                                                                <i onClick={() => removeItem(item)} className="fa fa-trash btn btn-danger"></i>
                                                            </div> */}
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
                    </div>)
                )
                }
            </div>

        </>
    )
}