import { Link } from "react-router-dom";

export default function Foot() {
    return (
        <>
            <footer className="container-fluid bg-dark p-2 p-sm-5 pb-1">
                <div className="row">

                    <div className="col-6 col-md d-flex flex-column mb-2 justify-content-around">
                        <h5>Social Networks</h5>
                        <div>
                            <i className="fa-brands fa-facebook fa-beat fa-2xl me-2 bg-white rounded-5" style={{ color: "#2568ef" }}></i>
                            <i className="fa-brands fa-twitter fa-shake fa-2xl me-2 bg-white rounded-5" style={{ color: "#1da1f2" }}></i>
                            <i className="fa-brands fa-square-instagram fa-beat-fade fa-2xl me-2 bg-white rounded-5" style={{ color: "#ff7b00" }}></i>
                            <i className="fa-brands fa-linkedin fa-bounce fa-2xl me-2 bg-white rounded-5" style={{ color: "#0075d5" }}></i>
                        </div>
                        <img src="./pictures/play-store.webp" alt="" width="160" height="50" />
                        <img src="./pictures/app-store.webp" alt="" width="160" height="50" />
                    </div>
                    <div className="col-6 col-md d-flex flex-column mb-2">
                        <h5>About Easwaran Entertainment</h5>
                        <div>
                            <a href="www.#.com">Who We Are</a><br />
                            <a href="www.#.com">Blog</a><br />
                            <a href="www.#.com">Work With Us</a><br />
                            <a href="www.#.com">Investor Relations</a><br />
                            <a href="www.#.com">Report Fraud</a><br />
                            <a href="www.#.com">Press Kit</a><br />
                            <a href="www.#.com">Contact Us</a><br />
                        </div>
                    </div>
                    <div className="col-6 col-md d-flex flex-column mb-2">
                        <h5>For Videos</h5>
                        <div>
                            <a href="www.#.com">Partner With Us</a><br />
                            <a href="www.#.com">Apps For You</a><br />
                        </div>
                    </div>
                    <div className="col-6 col-md d-flex flex-column mb-2">
                        <h5>Learn More</h5>
                        <div>
                            <a href="www.#.com">Privacy</a><br />
                            <a href="www.#.com">Security</a><br />
                            <a href="www.#.com">Terms</a><br />
                        </div>
                    </div>


                </div>
                <hr />
                <div>
                    <p className="mb-0">By continuing past this page, you agree to our Terms of Service, Cookie Policy,
                        Privacy Policy and Content Policies. All trademarks are properties of their respective owners.
                        2008-2024 © <Link to={"/grow"} className="text-decoration-none">Easwaran Entertainment™</Link> Ltd. All rights reserved.<a href="https://www.linkedin.com/in/muthu-ammew" className="text-decoration-none"> Designed by <span className="text-success text-decoration-underline fw-bolder">Muthu</span></a>
                    </p>
                </div>

            </footer>
        </>
    )
}
