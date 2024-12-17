import { useState } from 'react'
import { RegisterApi, M_RegisterApi } from '../../services/Api';
import { isAdmin, isAuthenticated } from '../../services/Auth';
import './RegisterPage.css';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function RegisterPage() {

    const [inputs, setInputs] = useState({
        fullName: "",
        email: "",
        pno: "",
        address: "",
        pwd: "",
        cpwd: "",
        terms: true
    })

    const initialStateErrors = {
        fullName: false,
        email: false,
        pno: false,
        address: false,
        pwd: false,
        cpwd: false,
        terms: false,
        custom_error: null
    };
    const [errors, setErrors] = useState(initialStateErrors);

    const [loading, setLoading] = useState(false);


    const handleSubmit = (event) => {
        event.preventDefault();
        let errors = initialStateErrors;
        let hasError = false;
        if (inputs.fullName === "") {
            errors.fullName = true;
            hasError = true;
        }
        if (inputs.email === "") {
            errors.email = true;
            hasError = true;
        }
        if (inputs.pno === "") {
            errors.pno = true;
            hasError = true;
        }
        if (inputs.address === "") {
            errors.address = true;
            hasError = true;
        }
        if (inputs.pwd === "") {
            errors.pwd = true;
            hasError = true;
        }
        if (inputs.cpwd !== inputs.pwd) {
            errors.cpwd = true;
            hasError = true;
        }
        if (inputs.terms === false) {
            errors.terms = true;
            hasError = true;
        }

        if (!hasError) {
            setLoading(true)
            async function api() {
                try {
                    let fireRegister = await RegisterApi(inputs);
                    await M_RegisterApi(inputs, fireRegister);
                    toast.success("New User Successfully Created");
                } catch (err) {
                    console.log(err)
                    if (err.response.data.error.message === "EMAIL_EXISTS") {
                        setErrors({ ...errors, custom_error: "Already this email has been registered!" });
                    } else if (String(err.response.data.error.message).includes('WEAK_PASSWORD')) {
                        setErrors({ ...errors, custom_error: "Password should be at least 6 characters!" });
                    }

                } finally {
                    setLoading(false)
                }
            }
            api();
        }
        setErrors(errors);
    }


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    function handleReset() {
        setInputs({
            fullName: "",
            email: "",
            pno: "",
            address: "",
            pwd: "",
            cpwd: "",
        })
        toast.info("Reset Successfully");
    }

    if (!isAuthenticated() || !isAdmin()) {
        return <Navigate to="/login" />
      }

    return (
        <>
            <div className="row min-vw-100 min-vh-100 justify-content-center align-items-center bgpic">
                <div className="col-11 col-sm-8 col-md-7 col-lg-6 col-xl-5">

                    <div className="d-flex flex-column justify-content-center align-items-center w-100 p-5 rounded-5 bg-body-tertiary bg-opacity-50">
                        <div className='text-center h2'>Create Users</div>
                        <form className="w-100" onSubmit={handleSubmit}>
                            <div className="w-100 mt-3">
                                <label htmlFor="fullName" className="form-label">Full Name</label>
                                <input type="text" className="form-control" name="fullName" value={inputs.fullName} id="fullName" onChange={handleChange} placeholder="Enter Full Name" />
                                {errors.fullName ?
                                    (<span className="text-danger bg-warning-subtle" >
                                        Full Name is required.
                                    </span>) : null
                                }
                            </div>
                            <div className="w-100 mt-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" value={inputs.email} onChange={handleChange} placeholder="Enter email" name="email" />
                                {errors.email ?
                                    (<span className="text-danger bg-warning-subtle" >
                                        Email Address is required.
                                    </span>) : null
                                }
                            </div>
                            <div className="w-100 mt-3">
                                <label htmlFor="pno" className="form-label">Phone Number</label>
                                <input type="number" className="form-control" id="pno" onChange={handleChange} placeholder="Enter phone number" name="pno" value={inputs.pno} />
                                {errors.pno ?
                                    (<span className="text-danger bg-warning-subtle" >
                                        Phone Number is required.
                                    </span>) : null
                                }
                            </div>
                            <div className="w-100 mt-3">
                                <label htmlFor="address" className="form-label">Address</label>
                                <textarea name="address" value={inputs.address} className="form-control" id="address" onChange={handleChange} placeholder="Enter your address"></textarea>
                                {errors.address ?
                                    (<span className="text-danger bg-warning-subtle" >
                                        Address is required.
                                    </span>) : null
                                }
                            </div>
                            <div className="w-100 mt-3">
                                <label htmlFor="pwd" className="form-label">Create a Temporary Password</label>
                                <input type="password" className="form-control" id="pwd" onChange={handleChange} placeholder="Enter password" name="pwd" value={inputs.pwd} />
                                {errors.pwd ?
                                    (<span className="text-danger bg-warning-subtle" >
                                        Password is required.
                                    </span>) : null
                                }
                            </div>
                            <div className="w-100 mt-3">
                                <label htmlFor="cpwd" className="form-label">Confirm your password</label>
                                <input type="password" className="form-control" id="cpwd" onChange={handleChange} placeholder="Enter Confirm password" name="cpwd" value={inputs.cpwd} />
                                {errors.cpwd ?
                                    (<span className="text-danger bg-warning-subtle" >
                                        Password Mismatch.
                                    </span>) : null
                                }
                            </div>

                            <div className="form-check">
                                <label className="form-check-label w-100 mt-3">
                                    <input className="form-check-input" type="checkbox" name="terms" value={inputs.terms} checked={inputs.terms} onChange={handleChange} /> I accept the <a className="fw-bold" href="www.#.com">Terms of Use &
                                        Privacy Policy</a>
                                </label>
                                {errors.terms ?
                                    (<h6 className="text-danger bg-warning-subtle" >
                                        Please agree Terms and Conditons...
                                    </h6>) : null
                                }
                            </div>


                            <div className="mt-3 text-center">
                                <span>
                                    {errors.custom_error ?
                                        (<p className="text-danger bg-warning-subtle rounded-5">{errors.custom_error}</p>)
                                        : null
                                    }
                                </span>
                                {loading ?
                                    (<div className="text-center">
                                        <div className="spinner-border text-primary " role="status">
                                        </div>
                                    </div>) : null
                                }

                                <button className="btn btn-primary me-5" type="submit">Submit</button>
                                <button className="btn btn-danger" type="reset" onClick={handleReset}>Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}