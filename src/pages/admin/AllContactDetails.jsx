import { useEffect, useState } from "react";
import { AllContactDetailsApi } from "../../services/Api";
import { isAdmin, isAuthenticated } from "../../services/Auth";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import AdminNavBar from "./AdminNavBar";


export default function AllContactDetails() {

    const [loading, setLoading] = useState(false);
    const [contacts, setContacts] = useState([]);


    useEffect(() => {
        if (isAuthenticated() && isAdmin()) {
            setLoading(true);
            AllContactDetailsApi().then((response) => {
                setContacts(response.data.contacts)
            })
            setLoading(false);
        }
    }, [])

    const contactData = () => {
        const data = {
            columns: [
                {
                    label: 'Contact ID ↕',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name ↕',
                    field: 'fname',
                    sort: 'asc'
                },
                {
                    label: 'Email ↕',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Phone No. ↕',
                    field: 'pno',
                    sort: 'asc'
                },
                {
                    label: 'Address ↕',
                    field: 'address',
                    sort: 'asc'
                },
                {
                    label: 'Date ↕',
                    field: 'date',
                    sort: 'asc'
                },

                {
                    label: 'Contact Details',
                    field: 'actions',
                    sort: 'asc'
                },
                {
                    label: 'All Requests',
                    field: 'actions2',
                    sort: 'asc'
                }

            ],
            rows: []
        }

        contacts.forEach(contact => {
            data.rows.push({
                id: contact._id,
                fname: contact.fname,
                email: contact.email,
                pno: contact.pno,
                address: contact.address,
                date: contact.createdAt,
                actions: (
                    <>
                        <Link className="me-1" to={`/admin/contactiddetails/${contact._id}`}>Full Contact Detils</Link>
                    </>),
                actions2: (
                    <>
                        <Link className="me-1" to={`/admin/contactdetails/${contact.email}`}>All Requests</Link>
                    </>)
            })
        })

        return data;
    }

    if (!isAuthenticated() || !isAdmin()) {
        return <Navigate to="/login" />
    }
    return (
        <>
            <AdminNavBar />
            <div className="container-fluid p-5 bodyBGPic">
                <h1 className="text-white-50">Contact Requests List</h1>
                <div className="bg-body-tertiary bg-opacity-50">
                    {!loading &&
                        <MDBDataTable
                            data={contactData()}
                            bordered
                            striped
                            hover
                            className="px-3"
                        />
                    }
                </div>
            </div>
        </>
    )
}
