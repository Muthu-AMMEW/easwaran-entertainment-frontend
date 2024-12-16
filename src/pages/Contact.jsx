import { useState } from "react";
import './Contact.css';
import axios from 'axios';
import { toast } from 'react-toastify';


export default function Contact() {
  const [inputs, setInputs] = useState({ fname: "", lname: "", pno: "", email: "", address: "", reason: "" });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (inputs.fname === "") {
      toast.error("Please Enter First Name");

    } else if (inputs.lname === "") {
      toast.error("Please Enter Last Name");

    } else if (inputs.pno === "") {
      toast.error("Please Enter Phone Number");

    } else if (inputs.email === "") {
      toast.error("Please Enter Email Address");

    } else if (inputs.address === "") {
      toast.error("Please Enter Your Address");

    } else if (inputs.reason === "") {
      toast.error("Please Enter Reason for Contact");

    } else {
      await axios.post("https://easwaran-entertainment-backend-deploy-10091389336.development.catalystappsail.com/inputcontact", inputs);

      toast.success("Submited Successfully...");
    }
  }

  // function placeContactHandler() {
  //   try {
  //     CreateContactApi(contact);
  //     setCartItems([]);
  //     toast.success("Contact Success!");
  //   } catch (err) {
  //     console.log(err)
  //   } finally {
  //     setComplete(true);
  //   }
  // }

  function resetFunc() {
    setInputs({ fname: "", lname: "", pno: "", email: "", address: "", reason: "" });
    toast.success("Reset Successfully...");
  }

  return (
    <>
      <div className="mm-contact-page container-fluid bodyBGPic p-5">
        <form>
          <h1 className="text-decoration-underline">Contact Us</h1>
          <div className="row">
            <div className="col-md-3">
              <label className="form-label" htmlFor="fname">First Name</label>
              <input className="form-control" type="text" id="fname" name="fname" value={inputs.fname} onChange={handleChange} />
            </div>

            <div className="col-md-3">
              <label className="form-label" htmlFor="lname">Last Name</label>
              <input className="form-control" type="text" id="lname" name="lname" value={inputs.lname} onChange={handleChange} />
            </div>
            <div className="w-100"></div>
            <div className="col-md-3">
              <label className="form-label" htmlFor="pno">Phone Number</label>
              <input className="form-control" type="text" id="pno" name="pno" value={inputs.pno} onChange={handleChange} />
            </div>

            <div className="col-md-3">
              <label className="form-label" htmlFor="email">Email Address</label>
              <input className="form-control" type="email" id="email" name="email" value={inputs.email} onChange={handleChange} />
            </div>

            <div className="col-md-8">
              <label className="form-label" htmlFor="address">Address</label>
              <input className="form-control" type="text" id="address" name="address" value={inputs.address} onChange={handleChange} />
            </div>

            <div className="col-md-10">
              <label className="form-label" htmlFor="reason">Reason for Contact</label>
              <textarea className="form-control" id="reason" name="reason" value={inputs.reason} onChange={handleChange} />

            </div>
            <div className="w-100"></div>

            <div className="col text-center mt-3">
              <button className="btn btn-lg btn-success me-5" type="submit" onClick={handleSubmit}>Submit</button>
              <button className="btn btn-lg btn-primary" type="reset" onClick={resetFunc}>Reset</button>
            </div>

          </div>



        </form>
      </div>
    </>
  )
}
