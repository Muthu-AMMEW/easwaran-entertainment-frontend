import { Link } from 'react-router-dom';
import { UserDetailsApi, M_UserDetailsApi } from "../services/Api";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/Auth";
import { useEffect, useState } from "react";


export default function UserProfile() {
    const [user, setUser] = useState({ fullName: "", email: "", pno: "", address: "", localId: "", createdAt: "", idToken: "" });


    useEffect(() => {
        if (isAuthenticated()) {
            UserDetailsApi().then((response) => {
                setUser(values => ({
                    ...values,
                    fullName: response.data.users[0].displayName,
                    email: response.data.users[0].email,
                    localId: response.data.users[0].localId,
                    idToken: response.data.users[0].idToken

                }))
            })
        }
    }, [])

    useEffect(() => {
        if (isAuthenticated() && user.localId) {
            M_UserDetailsApi(user.localId).then((response) => {
                setUser(values => ({
                    ...values,
                    pno: response.data.user[0].pno,
                    address: response.data.user[0].address,
                    createdAt: response.data.user[0].createdAt
                }));
            })
        }
    }, [user.localId])

    if (!isAuthenticated()) {
        //redirect user to login
        return <Navigate to="/login" />
    }

    return (<>
        <div className='row p-5'>
            <div className=' col-12 col-md-6 d-flex flex-column p-5'>
                <figure className='avatar avatar-profile'>
                    <img className="rounded-circle img-fluid" src={user.avatar ?? '/pictures/logo.png'} alt='...' height={300} width={300} />
                </figure>
                <div className='ps-sm-5'>
                <Link to={"/order"} className='btn btn-success me-3'>Change DP</Link>
                <Link to={"/profile/changepassword"} className='btn btn-danger'>Change Password</Link>
                </div>
            </div>
            <div className='col-12 col-md-6 ps-5 pt-5'>
                <h4>Full Name</h4>
                <p>{user.fullName}</p>

                <h4>Email Address</h4>
                <p>{user.email}</p>

                <h4>Joined</h4>
                <p className='pb-3'>{String(user.createdAt).substring(0, 10)}</p>
                
                <h4>Address</h4>
                <p className='w-50'>{user.address}</p>

                <h4>Phone Number</h4>
                <p>{user.pno}</p>


            </div>

        </div>
    </>)
}