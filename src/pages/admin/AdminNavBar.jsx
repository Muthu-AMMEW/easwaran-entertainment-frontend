import { Link } from "react-router-dom";

export default function AdminNavBar() {
  return (
    <>
    <div className='d-flex justify-content-center bg-body-secondary'>
        <div>
        <Link to={'/admin/newproduct'} className="btn btn-outline-danger mx-lg-3">New Product</Link>
        </div>

        <div>
        <Link to={'/admin/allproductdetails'} className="btn btn-outline-danger mx-lg-3">All Product</Link>
        </div>

        <div>
        <Link to={'/admin/allorderdetails'} className="btn btn-outline-danger mx-lg-3">Orders</Link>
        </div>

        <div>
        <Link to={'/admin'} className="btn btn-outline-danger mx-lg-3">Users</Link>
        </div>

        <div>
        <Link to={'/admin/productdetails'} className="btn btn-outline-danger mx-lg-3">Update Product</Link>
        </div>
    </div>
    </>
  )
}
