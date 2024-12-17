import { useEffect, useState } from "react";
import { ContactDetailsApi } from "../../services/Api";
import { useParams } from 'react-router-dom';
import { isAdmin, isAuthenticated } from "../../services/Auth";
import { Navigate } from "react-router-dom";
export default function ContactDetails() {

    const [contact, setContact] = useState();
    const { id } = useParams();

    useEffect(() => {
        if (isAuthenticated() && isAdmin()) {
            ContactDetailsApi(id).then((response) => {
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
                <h2 className="mt-5 text-center">Totally <b>{contact.length}</b> Contact Requests</h2>
                {contact.map((contactPart) =>
                (
                    <div className='m-lg-5' key={contactPart._id}>
                        <div className='m-lg-5'>
                            <div className='m-sm-5 border border-5 p-3'>
                                <h4 className='text-center text-decoration-underline m-1'>Contact ID #{contactPart._id}</h4>
                                <div><span className='fw-medium'>First Name : </span>{contactPart.fname}</div>
                                <div><span className='fw-medium'>Last Name : </span>{contactPart.lname}</div>
                                <div><span className='fw-medium'>Address : </span>{contactPart.address}</div>
                                <div><span className='fw-medium'>Phone Number : </span>{contactPart.pno}</div>
                                <div><span className='fw-medium'>Email Address : </span>{contactPart.email}</div>
                                <div><span className='fw-medium'>Date : </span>{contactPart.createdAt}</div>
                                <div><span className='fw-medium'>Reason : </span>{contactPart.reason}</div>
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