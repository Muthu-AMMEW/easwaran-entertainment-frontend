import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function ProductDetail({ cartItems, setCartItems }) {
    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);
    const { id } = useParams();

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + '/product/' + id)
            .then(res => res.json())
            .then(res => setProduct(res.product))
    }, [id]) //id parameter own cutomised

    function addToCart() {
        const itemExist = cartItems.find((item) => item.product._id === product._id)
        if (!itemExist) {
            const newItem = { product, qty };
            setCartItems((state) => [...state, newItem]);
            toast.success("Cart Item added succesfully!")
        }
    }

    function increaseQty() {
        if (product.stock === qty) {
            return;
        }
        setQty((state) => state + 1);
    }

    function decreaseQty() {
        if (qty > 1) {
            setQty((state) => state - 1);
        }
    }


    return (<>
        {product && <div className="container-fluid p-5">
            <div className="row">
                <div className="col-12 col-lg-5 text-center">
                    <img className=' img-fluid' src={product.images[0].image} alt={product.name} height="500" width="500" />
                </div>

                <div className="col-12 col-lg-5 mt-5 text-center">
                    <h3>{product.name}</h3>
                    <p className=' fst-italic'>Product #{product._id}</p>

                    <hr />

                    <div className="rating-outer">
                        <div className="rating-inner" style={{ width: `${product.ratings / 5 * 100}%` }}></div>
                    </div>


                    <hr />

                    <h5 className=' fw-bolder mb-3'>Rs. {product.price}</h5>
                    <div className="d-flex justify-content-evenly">
                        <span className="btn btn-danger" onClick={decreaseQty}>-</span>

                        <input className='form-control text-center w-25' type="number" name="qty" value={qty} readOnly />

                        <span className="btn btn-primary" onClick={increaseQty}>+</span>
                        <button type="button" onClick={addToCart} disabled={product.stock === 0} className="btn btn-primary">Add to Cart</button>
                    </div>
                    

                    <hr />

                    <p className='fw-bold'>Status <h5 className={product.stock > 0 ? 'text-success' : 'text-danger'}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</h5></p>

                    <hr />

                    <h4 className="mt-2">Description</h4>
                    <p>{product.description}</p>
                    <hr />
                    <h6>Sold by: <strong>{product.seller}</strong></h6>

                </div>

            </div>
        </div>}
    </>)
}