import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
    return (
        <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded">
                <img className="card-img-top mx-auto" src={product.images[0].image} alt={product.name} />
                <div className="card-body d-flex flex-column justify-content-evenly align-items-center">
                    <h5 className="card-title">
                        <Link className=' text-black' to={"/product/" + product._id} >{product.name}</Link>
                    </h5>
                    <div className="ratings m-3">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${product.ratings / 5 * 100}%` }} ></div>
                        </div>
                    </div>
                    <h5 className="card-text">Rs. {product.price}</h5>
                    <Link to={"/product/" + product._id} className="btn btn-warning m-3">View Details</Link>
                </div>
            </div>
        </div>)
}