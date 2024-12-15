import './LoginPage.css';

import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { LoginApi, M_UserDetailsApi } from '../../services/Api';
import { storeAdminData, storeUserData } from '../../services/Storage';
import { isAuthenticated } from '../../services/Auth';
import { toast } from 'react-toastify';

export default function LoginPage() {

    const [inputs, setInputs] = useState({
        email: "",
        pwd: ""
    })

    const initialStateErrors = {
        email: false,
        pwd: false,
        remember: false,
        custom_error: null
    };
    const [errors, setErrors] = useState(initialStateErrors);

    const [loading, setLoading] = useState(false);


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }


    const handleSubmit = (event) => {

        event.preventDefault();
        let errors = initialStateErrors;
        let hasError = false;

        if (inputs.email === "") {
            errors.email = true;
            hasError = true;
        }
        if (inputs.pwd === "") {
            errors.pwd = true;
            hasError = true;
        }

        if (!hasError) {
            setLoading(true)
            async function api() {
                try {
                    let fireData = await LoginApi(inputs);
                    let mData = await M_UserDetailsApi(fireData.data.localId);
                    storeAdminData(mData.data.user[0].role);
                    storeUserData(fireData.data.idToken);

                } catch (err) {
                    // eslint-disable-next-line
                    if (err.code = "ERR_BAD_REQUEST") {
                        setErrors({ ...errors, custom_error: "Invalid Credentials." })
                    }

                } finally {
                    setLoading(false)
                }
            }
            api();
        }
        setErrors({ ...errors });

    }
    function handleReset() {
        setInputs({
            email: "",
            pwd: ""
        })
        toast.info("Reset Successfully");
    }

    if (isAuthenticated()) {
        //redirect user to home
        return <Navigate to="/home" />
    }


    return (
        <>
            <div className="row min-vw-100 min-vh-100 justify-content-center align-items-center bgpic">
                <div className="col-11 col-sm-8 col-md-7 col-lg-6 col-xl-5">

                    <div
                        className="d-flex flex-column justify-content-center align-items-center w-100 p-5 rounded-5 bg-body-tertiary bg-opacity-50">

                        <div className='text-center h2'>Log In</div>
                        <form className="w-100" onSubmit={handleSubmit}>
                            <div className="w-100 mt-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" value={inputs.email} onChange={handleChange} />
                                {errors.email ?
                                    (<span className="text-danger bg-warning-subtle" >
                                        Email is required.
                                    </span>) : null
                                }
                            </div>
                            <div className="w-100 mt-3">
                                <label htmlFor="pwd" className="form-label">Password</label>
                                <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pwd" value={inputs.pwd} onChange={handleChange} />
                                {errors.pwd ?
                                    (<span className="text-danger bg-warning-subtle" >
                                        Password is required.
                                    </span>) : null
                                }
                            </div>
                            <div className="d-flex justify-content-between w-100 mt-3">
                                <div className="form-check">
                                    <label className="form-check-label">
                                        <input className="form-check-input" type="checkbox" name="remember" value={inputs.remember} onChange={handleChange} /> Remember me
                                    </label>

                                </div>
                                <div><a href="/forgetpassword" className="fw-bold">Forget Password?</a></div>
                            </div>
                            <div className="mt-3 text-center">
                                {loading ?
                                    (<div className="text-center">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>) : null
                                }
                                <span className="text-danger bg-warning-subtle" >
                                    {errors.custom_error ?
                                        (<p>{errors.custom_error}</p>)
                                        : null
                                    }
                                </span>
                                <button className="btn btn-primary me-5" type="submit">Submit</button>
                                <button className="btn btn-danger" type="reset" onClick={handleReset}>Reset</button>
                            </div>
                            <div className="text-center mt-4">Do not have an account? <Link className="fw-bold" to="/signup">Sign up</Link></div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}