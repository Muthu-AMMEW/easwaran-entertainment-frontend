import { Link } from "react-router-dom";
import Search from "./Search";
import { useNavigate} from "react-router-dom"; //removed ", Navigate"
import { logout, isAuthenticated } from "../services/Auth"
import "./NavBar.css";

export default function NavBar({ cartItems }) {
    const navigate = useNavigate();
    const logoutUser = () => {
        logout();
        navigate('/login');
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid d-flex">
                <div className="d-flex">
                    <Link className="navbar-brand d-flex" to={"/"}>
                        <img src="./pictures/logo.png" alt="logo" width="60" height="60" />
                        <h5 className="mt-3">APL Food</h5>
                    </Link>
                    <div className="m-2 d-md-none"></div>
                    <Link to={"/"} className="btn btn-outline-danger d-none d-sm-block my-3 mx-1">Home</Link>
                    {!isAuthenticated() && <Link to={"/login"} className="btn btn-outline-success d-lg-none my-3 mx-1">Login</Link>}

                </div>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle ms-lg-2 me-2" href="www.google.com" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false"><i
                                    className="fa-brands fa-slack fa-lg me-2"></i>
                                Social Networks
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="https://www.facebook.com/EaswaranEntertainment"><i
                                    className="fa-brands fa-facebook fa-lg me-2"></i>Facebook</a>
                                </li>
                                <li><a className="dropdown-item" href="https://EaswaranEntertainment.blogspot.com"><i
                                    className="fa-brands fa-blogger fa-lg me-2"></i>Blogger</a></li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li><a className="dropdown-item me-2" href="https://m.me/PiyoosTech"><i
                                    className="fa-brands fa-facebook-messenger fa-lg me-2"></i>Chat(Via FB page Message
                                    button)</a></li>
                            </ul>
                        </li>
                    </ul>
                    {isAuthenticated() && <Search />}
                    {!isAuthenticated() && <Link to={"/login"} className="btn btn-outline-success my-3 mx-1 d-none d-lg-block">Login</Link>}
                    {!isAuthenticated() && <Link to={"/signup"} className="btn btn-outline-warning my-3 mx-1">Sign Up</Link>}
                    {isAuthenticated() && <Link className="nav-link" to="/dashboard" >Dashboard</Link>}
                    {/*eslint-disable-next-line*/}
                    {isAuthenticated() && <a className="nav-link" onClick={logoutUser} style={{ cursor: "pointer" }} >Logout</a>}
                    {isAuthenticated() && <Link to={"/cart"}>Cart
                        <span>{cartItems.length}</span>
                    </Link>}
                </div>
            </div >
        </nav >
    )
}