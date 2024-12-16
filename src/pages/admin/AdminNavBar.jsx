import { Link } from "react-router-dom";

export default function AdminNavBar() {
  return (
    <>
    <div className='d-flex justify-content-center bg-body-secondary'>
        <div>
        <Link to={'/admin/newvideo'} className="btn btn-outline-danger mx-lg-3">New Video</Link>
        </div>

        <div>
        <Link to={'/admin/allvideodetails'} className="btn btn-outline-danger mx-lg-3">All Video</Link>
        </div>

        <div>
        <Link to={'/admin'} className="btn btn-outline-danger mx-lg-3">Contacts</Link>
        </div>

        <div>
        <Link to={'/admin/alluserdetails'} className="btn btn-outline-danger mx-lg-3">Users</Link>
        </div>
    </div>
    </>
  )
}
