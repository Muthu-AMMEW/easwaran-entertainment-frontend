import { useState } from 'react'
import { toast } from 'react-toastify';
import { ForgetPasswordApi } from '../../services/Api';
import { isAuthenticated } from '../../services/Auth';
import { Navigate } from "react-router-dom";

export default function ForgetPassword() {

  const [inputs, setInputs] = useState({
    email: ""
  })

  const initialStateErrors = {
    email: false,
    custom_error: null
  };
  const [errors, setErrors] = useState(initialStateErrors);

  const [loading, setLoading] = useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();
    let errors = initialStateErrors;
    let hasError = false;
    if (inputs.email === "") {
      errors.email = true;
      hasError = true;
    }

    if (!hasError) {
      setLoading(true)
      async function api() {
        try {
          await ForgetPasswordApi(inputs);
          toast.success("Submited Successfully, Please Check your Email");
        } catch (err) {
          if (err.response.data.error.message === "EMAIL_NOT_FOUND") {
            setErrors({ ...errors, custom_error: "Email Address not found" });
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
      email: ""
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

          <div className="d-flex flex-column justify-content-center align-items-center w-100 p-5 rounded-5 bg-body-tertiary bg-opacity-50">
            <div className='text-center h2'>Reset Password</div>
            <form className="w-100" onSubmit={handleSubmit}>

              <div className="w-100 mt-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" value={inputs.email} onChange={handleChange} placeholder="Enter email" name="email" />
                {errors.email ?
                  (<span className="text-danger bg-warning-subtle" >
                    Email Address is required.
                  </span>) : null
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