import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { M_UserDetailsApi, UserDetailsApi} from "../services/Api";
import { isAuthenticated, logout } from "../services/Auth";
import { useNavigate } from "react-router-dom";


export default function UserDropDown() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ fullName: "", email: "", localId: "", role:"" });

    useEffect(() => {
        if (isAuthenticated()) {

            async function api() {
                try {
                    let response = await UserDetailsApi();
                    setUser(values => ({
                        ...values,
                        localId: response.data.users[0].localId,
                    }))
                } catch (err) {
                    console.log(err)
                    if (err.response.data.error.message === "INVALID_ID_TOKEN") {
                        logout();
                        navigate('/login');
                    }
                }
            }
            api();
        }
    }, [navigate])

    useEffect(() => {
        if (isAuthenticated() && user.localId) {
            M_UserDetailsApi(user.localId).then((response) => {
                setUser(values => ({
                    ...values,
                    fullName: response.data.user[0].fullName,
                    role: response.data.user[0].role,
                    email: response.data.user[0].email
                }));
            })
        }
    }, [user.localId])

    return (
        <>
            <div className="dropdown">

                <a className="nav-link dropdown-toggle text-white-50" href="www.google.com" role="button"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa-solid fa-user fa-lg"></i><span className="h6 m-1">User</span>
                </a>
                <ul className="dropdown-menu">

                    <li><Link to={"/profile"} className="dropdown-item border border-2 fw-medium">{user.fullName}</Link>
                    </li>

                    <li><Link className="dropdown-item" to={"/profile"}>
                    <i className="fa-regular fa-id-card"></i><span className="h6 m-2">Profile</span></Link>
                    </li>

                    <li>
                    <Link className="dropdown-item" to={"/admin/allcontactdetails"}>
                        <i className="fa-solid fa-envelopes-bulk fa-beat" style={{ color: "#63E6BE" }}></i><span className="h6 m-2">Contact Requests</span>
                    </Link>
                    </li>

                    <li><Link className="dropdown-item" to={"/signup"}>
                    <i className="fa-solid fa-users" style={{ color: "#B197FC" }}></i><span className="h6 m-2">Create Users</span></Link>
                    </li>

                    {user.role === 'admin' ? <li><Link className="dropdown-item" to={'/admin'}><i className="fa-solid fa-bars-progress fa-fade"></i><span className="h6 m-2">Dashboard</span></Link></li>:null}

                    
                </ul>
            </div>
        </>
    )
}
