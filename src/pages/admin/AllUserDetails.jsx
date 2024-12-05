import { useEffect, useState } from "react";
import { M_AllUserDetailsApi } from "../../services/Api";
import { isAdmin, isAuthenticated } from "../../services/Auth";
import { MDBDataTable } from "mdbreact";
import { Navigate } from 'react-router-dom';

export default function AllUserDetails() {

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);


    useEffect(() => {
        if (isAuthenticated() && isAdmin()) {
            setLoading(true);
            M_AllUserDetailsApi().then((response) => {
                setUsers(response.data.users)
            })
            setLoading(false);
        }
    }, [])

    const userData = () => {
        const data = {
            columns : [
                {
                    label: 'ID ↕',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name ↕',
                    field: 'name',
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
                    label: 'Role ↕',
                    field: 'role',
                    sort: 'asc'
                }
            ],
            rows : []
        }

        users.forEach( user => {
            data.rows.push({
                id: user.localId,
                name: user.fullName,
                email : user.email,
                pno: user.pno,
                address: user.address,
                role: user.role
            })
        })

        return data;
    }

    if (!isAuthenticated() || !isAdmin()) {
        return <Navigate to="/login" />
    }

  return (
    <>
    <div className=" container-fluid p-5">
            <h1 className="my-4">User List</h1>
            <div>
                {!loading && 
                    <MDBDataTable
                        data={userData()}
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
