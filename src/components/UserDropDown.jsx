import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { M_UserDetailsApi, UserDetailsApi} from "../services/Api";
import { isAuthenticated } from "../services/Auth";


export default function UserDropDown() {
    const [user, setUser] = useState({ fullName: "", email: "", localId: "", role:"" });

    useEffect(() => {
        if (isAuthenticated()) {
            UserDetailsApi().then((response) => {
                setUser(values => ({
                    ...values,
                    email: response.data.users[0].email,
                    localId: response.data.users[0].localId

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
                    role: response.data.user[0].role
                }));
            })
        }
    }, [user.localId])

    return (
        <>
            <div className="dropdown m-3">

                <a className="nav-link dropdown-toggle" href="www.google.com" role="button"
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
                    <Link className="dropdown-item" to={"/cart"}>
                        <i className="fa-solid fa-cart-shopping fa-beat" style={{ color: "#FFD43B" }}></i><span className="h6 m-2">Cart</span>
                    </Link>
                    </li>

                    {user.role === 'admin' ? <li><Link className="dropdown-item" to={'/admin'}><i className="fa-solid fa-bars-progress fa-fade"></i><span className="h6 m-2">Dashboard</span></Link></li>:null}

                    <li><Link className="dropdown-item fw-medium" to={'/orderdetails'}><i className="fa-solid fa-truck-fast fa-beat-fade me-2" style={{color: "#63E6BE"}}></i>Orders</Link>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li><a className="dropdown-item me-2" href="https://m.me/Muthu.AMMEW"><i
                        className="fa-brands fa-facebook-messenger fa-lg me-2"></i>Chat</a></li>
                </ul>
            </div>
        </>
    )
}
