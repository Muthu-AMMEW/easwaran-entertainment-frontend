import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/Auth";
import { VideoDetailsApi } from '../services/Api';


export default function VideoDetails({ cartItems, setCartItems }) {
    const [video, setVideo] = useState(null);
    const [qty, setQty] = useState(1);
    const { id } = useParams();

    useEffect(() => {
        if (isAuthenticated()) {
            VideoDetailsApi(id).then(res => setVideo(res.data.video))
        }
    }, [id])

    function addToCart() {
        const itemExist = cartItems.find((item) => item.video._id === video._id)
        if (!itemExist) {
            const newItem = { video, qty };
            setCartItems((state) => [...state, newItem]);
            toast.success("Cart Item added succesfully!")
        }
    }

    function increaseQty() {
        if (video.stock === qty) {
            return;
        }
        setQty((state) => state + 1);
    }

    function decreaseQty() {
        if (qty > 1) {
            setQty((state) => state - 1);
        }
    }
    if (!isAuthenticated()) {
        //redirect user to login
        return <Navigate to="/login" />
    }


    return (<>
        {video && <div className="container-fluid p-5">
            <div className="row">
                <div className="col-12 col-lg-5 text-center">
                    <img className='img-fluid rounded-3' src={video.images[0].image} alt={video.name} height="500" width="500" />
                </div>

                <div className="col-12 col-lg-5 mt-5 text-center">
                    <h3>{video.name}</h3>
                    <p className=' fst-italic'>Video #{video._id}</p>

                    <hr />

                    <div className="rating-outer">
                        <div className="rating-inner" style={{ width: `${video.ratings / 5 * 100}%` }}></div>
                    </div>


                    <hr />

                    <h5 className=' fw-bolder mb-3'>Rs. {video.price}</h5>
                    <div className="d-flex justify-content-evenly">
                        <span className="btn btn-danger" onClick={decreaseQty}>-</span>

                        <input className='form-control text-center w-25' type="number" name="qty" value={qty} readOnly />

                        <span className="btn btn-primary" onClick={increaseQty}>+</span>
                        <button type="button" onClick={addToCart} disabled={video.stock === 0} className="btn btn-primary">Add to Cart</button>
                    </div>


                    <hr />

                    <p className='fw-bold'>Status <h5 className={video.stock > 0 ? 'text-success' : 'text-danger'}>{video.stock > 0 ? 'In Stock' : 'Out of Stock'}</h5></p>

                    <hr />

                    <h4 className="mt-2">Description</h4>
                    <p>{video.description}</p>
                    <h6 className="card-text text-danger">{video.category}</h6>
                    <hr />
                    <h6>Sold by: <strong>{video.seller}</strong></h6>

                </div>

            </div>
        </div>}
    </>)
}