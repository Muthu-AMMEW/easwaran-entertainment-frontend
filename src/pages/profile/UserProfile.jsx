import { Link } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAuthenticated } from '../../services/Auth';
import { M_UserDetailsApi, UserDetailsApi } from '../../services/Api';

export default function UserProfile() {
    const [user, setUser] = useState({ fullName: "", email: "", pno: "", address: "", localId: "", createdAt: "", idToken: "" });


    useEffect(() => {
        if (isAuthenticated()) {
            UserDetailsApi().then((response) => {
                setUser(values => ({
                    ...values,
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
                    fullName: response.data.user[0].fullName,
                    pno: response.data.user[0].pno,
                    address: response.data.user[0].address,
                    createdAt: response.data.user[0].createdAt,
                    profile: response.data.user[0].profile
                }));
            })
        }
    }, [user.localId])

    if (!isAuthenticated()) {
        //redirect user to login
        return <Navigate to="/login" />
    }

    return (<>
        <div className='row p-5 bg-dark-subtle'>
            <div className=' col-12 col-md-6'>
                <div className='row'>
                    <div className='col-12 text-center mt-1 mb-4 mt-md-5'>

                        <img className="rounded-circle" src={user.profile ?? '/pictures/logo.png'} alt='...' width={300} height={300} />

                    </div>
                    <div className='col-12 text-center'>
                        <Link to={"/profile/updateprofile"} className='btn btn-success me-3'>Update Profile</Link>
                        <Link to={"/profile/changepassword"} className='btn btn-danger mt-1 mt-sm-0'>Change Password</Link>
                    </div>

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