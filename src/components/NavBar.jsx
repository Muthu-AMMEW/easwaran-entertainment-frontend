import { Link } from "react-router-dom";
import Search from "./Search";
import { useNavigate } from "react-router-dom"; //removed ", Navigate"
import { logout, isAuthenticated } from "../services/Auth"
import "./Components.css";
import UserDropDown from "./UserDropDown";

export default function NavBar({ cartItems }) {
	const navigate = useNavigate();
	const logoutUser = () => {
		logout();
		navigate('/login');
	}
	return (
		<>
			<div className="container-fluid">
				<div className="row m-0">
					<div className="col-3 col-lg-2 px-0">
						<Link to="/">
							<img className="img-fluid" src="./pictures/logo.png" alt="logo" />
						</Link>
					</div>
					<div className="col banner">
					</div>
				</div>
			</div>

			<nav className="navbar bg-dark navbar-expand-lg" data-bs-theme="dark">
				<div className="container-fluid">
					<div className="d-flex justify-content-between">
						<Link className="navbar-brand fs-6 d-none d-sm-block d-lg-none d-xl-block ps-1" to="/">Easwaran Entertainment</Link>

						<Link className="btn btn-outline-success active me-2" aria-current="page" to={"/home"}>Home</Link>
						<a className="btn btn-danger youtubeRed me-2" href="https://www.youtube.com/@EaswaranEntertainment"><i className="bi bi-youtube"></i>Youtube Channel</a>
					</div>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item dropdown">
								<a className="nav-link dropdown-toggle ms-lg-2 me-2" href="www.google.com" role="button"
									data-bs-toggle="dropdown" aria-expanded="false"><i
										className="fa-brands fa-slack fa-spin fa-lg me-2"></i>
									Social Networks
								</a>
								<ul className="dropdown-menu">
									<li><a className="dropdown-item" href="https://www.facebook.com/EaswaranEntertainment">
										<i className="fa-brands fa-facebook fa-beat bg-white rounded-5 me-2 fa-lg" style={{ color: "#2568ef" }}></i>Facebook</a>
									</li>
									<li><a className="dropdown-item" href="https://EaswaranEntertainment.blogspot.com">
									<i className="fa-brands fa-blogger fa-fade bg-white rounded-5 me-2 fa-lg" style={{ color: "#ff5722" }}></i>Blogger</a></li>
									<li><a className="dropdown-item" href="https://www.x.com">
										<i className="fa-brands fa-twitter fa-shake bg-white rounded-5 me-2 fa-lg" style={{ color: "#1da1f2" }}></i>Twitter</a></li>
									<li><a className="dropdown-item" href="https://www.youtube.com">
										<i className="fa-brands fa-youtube fa-beat-fade bg-white rounded-5 me-2 fa-lg" style={{ color: "#ff0000" }}></i>Youtube</a></li>
									<li><a className="dropdown-item" href="https://www.instagram.com">
										<i className="fa-brands fa-square-instagram fa-beat-fade bg-white rounded-5 me-2 fa-lg" style={{ color: "#ff7b00" }}></i>Instagram</a></li>

									<li>
										<hr className="dropdown-divider" />
									</li>
									<li><a className="dropdown-item me-2" href="https://www.facebook.com/PiyoosTech"><i
										className="fa-brands fa-facebook-messenger fa-lg me-2"></i>Chat(Via FB page Message
										button)</a></li>
								</ul>
							</li>

							<li className="nav-item">
								<Link className="nav-link" to="/contact"><i className="bi bi-door-open"></i>Contact Us</Link>
							</li>

						</ul>
						{!isAuthenticated() && <Link to={"/login"} className="btn btn-outline-success my-3 mx-1 d-none d-lg-block">Login</Link>}

						{!isAuthenticated() && <Link to={"/signup"} className="btn btn-outline-warning my-3 mx-1">Sign Up</Link>}
						{isAuthenticated() && <div className="nav-link d-flex my-3 my-lg-0">
							<UserDropDown />
							<Link to={"/login"} className="mx-3" title="Logout" onClick={logoutUser}>
								<i className="fa-solid fa-arrow-right-from-bracket fa-xl" style={{ color: "#63E6BE" }}>
								</i>
							</Link>
						</div>}
						<Search />
					</div>
				</div>
			</nav>
		</>
	)
}