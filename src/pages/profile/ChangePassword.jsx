import { useState } from 'react'
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import { ChangePasswordApi} from '../../services/Api';
import { isAuthenticated } from '../../services/Auth';
import { getUserData, storeUserData } from '../../services/Storage';


export default function ChangePassword() {

  const [inputs, setInputs] = useState({
    pwd: "",
    cpwd: "",
    idToken: ""
  })
  const initialStateErrors = {
    pwd: false,
    cpwd: false,
    custom_error: null
  };
  const [errors, setErrors] = useState(initialStateErrors);

  const [loading, setLoading] = useState(false);

  inputs.idToken = getUserData();

  const handleSubmit = (event) => {
    event.preventDefault();
    let errors = initialStateErrors;
    let hasError = false;
    if (inputs.pwd === "") {
      errors.pwd = true;
      hasError = true;
    }
    if (inputs.cpwd !== inputs.pwd) {
      errors.cpwd = true;
      hasError = true;
    }

    if (!hasError) {
      setLoading(true)
      async function api() {
        try {
          console.log(inputs)
          await ChangePasswordApi(inputs).then((response) => {
          storeUserData(response.data.idToken)})
          toast.success("Password Changed Successfully");
        } catch (err) {
          console.log(err)
          if (err.response.data.error.message === "CREDENTIAL_TOO_OLD_LOGIN_AGAIN") {
            setErrors({ ...errors, custom_error: "The user's credential is no longer valid. The user must sign in again." });
          } else if (String(err.response.data.error.message).includes('WEAK_PASSWORD')) {
            setErrors({ ...errors, custom_error: "Password should be at least 6 characters!" });
          } else if (err.response.data.error.message === "TOKEN_EXPIRED") {
            setErrors({ ...errors, custom_error: "Token expired. The user must sign in again." });
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

  if (!isAuthenticated()) {
    //redirect user to home
    return <Navigate to="/home" />
  }

  return (
    <>
      <div className="row min-vw-100 min-vh-100 justify-content-center align-items-center bgpic">
        <div className="col-11 col-sm-8 col-md-7 col-lg-6 col-xl-5">

          <div className="d-flex flex-column justify-content-center align-items-center w-100 p-5 rounded-5 bg-body-tertiary bg-opacity-50">
            <div className='text-center h2'>Change Password</div>
            <form className="w-100" onSubmit={handleSubmit}>

              <div className="w-100 mt-3">
                <label htmlFor="pwd" className="form-label">Create a password</label>
                <input type="password" className="form-control" id="password" onChange={handleChange} placeholder="Enter password" name="pwd" value={inputs.pwd} />
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
                <button className="btn btn-danger" type="reset">Reset</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}