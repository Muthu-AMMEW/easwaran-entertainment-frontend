import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import { M_UserDetailsApi, UpdateProfileApi, UserDetailsApi } from '../../services/Api';
import { isAuthenticated } from '../../services/Auth';
import { getUserData } from '../../services/Storage';


export default function UpdateProfile() {

  const [inputs, setInputs] = useState({ fullName: "", email: "", pno: "", address: "", localId: "", profile: "", idToken: "" });


  const initialStateErrors = {
    fullName: false,
    pno: false,
    address: false,
    profile: false,
    custom_error: null
  };
  const [errors, setErrors] = useState(initialStateErrors);

  const [loading, setLoading] = useState(false);

  inputs.idToken = getUserData();

  useEffect(() => {
    if (isAuthenticated()) {
      UserDetailsApi().then((response) => {
        setInputs(values => ({
          ...values,
          localId: response.data.users[0].localId,

        }))
      })
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated() && inputs.localId) {
      M_UserDetailsApi(inputs.localId).then((response) => {
        setInputs(values => ({
          ...values,
          fullName: response.data.user[0].fullName,
          email: response.data.user[0].email,
          pno: response.data.user[0].pno,
          address: response.data.user[0].address,
          profile: response.data.user[0].profile
        }));
      })
    }
  }, [inputs.localId])

  if (!isAuthenticated()) {
    //redirect user to login
    return <Navigate to="/login" />
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let errors = initialStateErrors;
    let hasError = false;
    if (inputs.fullName === "") {
      errors.fullName = true;
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
    if (inputs.profile === "") {
      errors.profile = true;
      hasError = true;
    }


    if (!hasError) {
      setLoading(true)
      async function api() {
        try {
          await UpdateProfileApi(inputs);
          toast.success("Profile Updated Successfully");
        } catch (err) {
          console.log(err)
            setErrors({ ...errors, custom_error: err });
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

  return (
    <>
      <div className="row min-vw-100 min-vh-100 justify-content-center align-items-center bgpic">
        <div className="col-11 col-sm-8 col-md-7 col-lg-6 col-xl-5">

          <div className="d-flex flex-column justify-content-center align-items-center w-100 p-5 rounded-5 bg-body-tertiary bg-opacity-50">
            <div className='text-center h2'>Update Profile</div>
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
                <input type="email" className="form-control" id="email" value={inputs.email} disabled placeholder="Enter email" name="email" />
                  <span className="text-danger form-text bg-warning-subtle" >
                    Due to security reason you can not change Email Address.
                  </span>
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
                <label htmlFor="profile" className="form-label">Profile Pictrue URL</label>
                <input type="url" className="form-control" id="profile" onChange={handleChange} placeholder="Please enter your profile picture URL" name="profile" value={inputs.profile} />
                {errors.profile ?
                  (<span className="text-danger bg-warning-subtle" >
                    profile URL is required.
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