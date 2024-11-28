import { Link } from "react-router-dom";

export default function UserDropDown() {
    return (
        <>
            <div className="dropdown m-3">

                <a className="nav-link dropdown-toggle" href="www.google.com" role="button"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa-solid fa-user fa-lg"></i><span className="h6 m-1">User</span>

                </a>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="https://www.facebook.com/EaswaranEntertainment"><i
                        className="fa-brands fa-facebook fa-lg me-2"></i>Orders</a>
                    </li>
                    <li><a className="dropdown-item" href="https://EaswaranEntertainment.blogspot.com"><i
                        className="fa-brands fa-blogger fa-lg me-2"></i>Blogger</a></li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li><a className="dropdown-item me-2" href="https://m.me/PiyoosTech"><i
                        className="fa-brands fa-facebook-messenger fa-lg me-2"></i>Chat</a></li>
                </ul>
            </div>

            <Link className="nav-link" to="/home" ></Link>
        </>
    )
}
