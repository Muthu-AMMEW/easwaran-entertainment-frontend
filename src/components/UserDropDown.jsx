import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserDetailsApi} from "../services/Api";
import { isAuthenticated } from "../services/Auth";

export default function UserDropDown() {
    const [user, setUser] = useState({ fullName: "", email: "", localId: "" });

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

    return (
        <>
            <div className="dropdown m-3">

                <a className="nav-link dropdown-toggle" href="www.google.com" role="button"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa-solid fa-user fa-lg"></i><span className="h6 m-1">User</span>

                </a>
                <ul className="dropdown-menu">
                    <li><Link to={"/user"} className="dropdown-item border border-2 fw-medium">{user.fullName}</Link>
                    </li>
                    <li><Link className="dropdown-item fw-medium" to={'/order'}><i class="fa-solid fa-truck-fast fa-beat-fade me-2" style={{color: "#63E6BE"}}></i>Orders</Link>
                    </li>
                    <li><a className="dropdown-item" href="https://EaswaranEntertainment.blogspot.com"><i
                        className="fa-brands fa-blogger fa-lg me-2"></i>Blogger</a></li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li><a className="dropdown-item me-2" href="https://m.me/Muthu.AMMEW"><i
                        className="fa-brands fa-facebook-messenger fa-lg me-2"></i>Chat</a></li>
                </ul>
            </div>

            <Link className="nav-link" to="/home" ></Link>
        </>
    )
}
