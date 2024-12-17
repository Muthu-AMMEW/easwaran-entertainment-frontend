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
                            <div><span className='fw-medium'>First Name : </span>{contact.fname}</div>
                            <div><span className='fw-medium'>Last Name : </span>{contact.lname}</div>
                            <div><span className='fw-medium'>Address : </span>{contact.address}</div>
                            <div><span className='fw-medium'>Phone Number : </span>{contact.pno}</div>
                            <div><span className='fw-medium'>Email Address : </span>{contact.email}</div>
                            <div><span className='fw-medium'>Date : </span>{contact.createdAt}</div>
                            <div><span className='fw-medium'>Reason : </span>{contact.reason}</div>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}