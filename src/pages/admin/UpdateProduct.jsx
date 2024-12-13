import { useEffect, useState } from 'react'
import { ProductDetailsApi, UpdateProductApi } from '../../services/Api';
import { isAdmin, isAuthenticated } from '../../services/Auth';
import { toast } from 'react-toastify';
import { Navigate, useParams } from 'react-router-dom';


export default function UpdateProduct() {


    const [inputs, setInputs] = useState({
        name: "",
        price: "",
        description: "",
        ratings: "",
        images: "",
        category: "select",
        seller: "",
        stock: ""
    })


    const initialStateErrors = {
        name: false,
        price: false,
        description: false,
        ratings: false,
        images: false,
        category: false,
        seller: false,
        stock: false,
        custom_error: null
    };
    const [errors, setErrors] = useState(initialStateErrors);

    const [loading, setLoading] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        if (isAuthenticated() && isAdmin()) {

            ProductDetailsApi(id).then((response) => {
                setInputs(values => ({
                    ...values,
                    name: response.data.product.name,
                    price: response.data.product.price,
                    description: response.data.product.description,
                    ratings: response.data.product.ratings,
                    images: response.data.product.images[0].image,
                    category: response.data.product.category,
                    seller: response.data.product.seller,
                    stock: response.data.product.stock
                }));
            })
        }
    }, [id])



    const handleSubmit = (event) => {
        event.preventDefault();
        let errors = initialStateErrors;
        let hasError = false;
        if (inputs.name === "") {
            errors.name = true;
            hasError = true;
        }
        if (inputs.price === "") {
            errors.price = true;
            hasError = true;
        }
        if (inputs.description === "") {
            errors.description = true;
            hasError = true;
        }
        if (inputs.ratings < "1" || inputs.ratings > "5") {
            errors.ratings = true;
            hasError = true;
        }
        if (inputs.images === "") {
            errors.images = true;
            hasError = true;
        }
        if (inputs.category === "select") {
            errors.category = true;
            hasError = true;
        }
        if (inputs.seller === "") {
            errors.seller = true;
            hasError = true;
        }
        if (inputs.stock === "") {
            errors.stock = true;
            hasError = true;
        }
        if (!hasError && isAuthenticated() && isAdmin()) {
            setLoading(true)
            async function api() {
                try {
                    UpdateProductApi(inputs, id);
                    toast.success("Product Updated Successfully");
                } catch (err) {
                    setErrors(values => ({ ...values, custom_error: err }))
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
            name: "",
            price: "",
            description: "",
            ratings: "",
            images: "",
            category: "select",
            seller: "",
            stock: ""
        })

    }

    if (!isAuthenticated() || !isAdmin()) {
        return <Navigate to="/login" />
    }

    return (
        <>
            <div className="row min-vw-100 min-vh-100 justify-content-center align-items-center bgpic">
                <div className="col-11 col-sm-8 col-md-7 col-lg-6 col-xl-5">

                    <div className="d-flex flex-column justify-content-center align-items-center w-100 p-5 rounded-5 bg-body-tertiary bg-opacity-50">
                        <div className='text-center h2'>Update Product</div>
                        <form className="w-100" onSubmit={handleSubmit}>

                            <div className="w-100 mt-3">
                                <label htmlFor="name" className="form-label">Product Name</label>
                                <input type="text" className="form-control" name="name" value={inputs.name} id="name" onChange={handleChange} placeholder="Enter Product Name" />
                                {errors.name ?
                                    (<span className="text-danger bg-warning-subtle" >
                                        Product Name is required.
                                    </span>) : null
                                }
                            </div>

                            <div className="w-100 mt-3">
                                <label htmlFor="price" className="form-label">Product Price</label>
                                <input type="number" className="form-control" id="price" name="price" value={inputs.price} onChange={handleChange} placeholder="Enter Product Price" />
                                {errors.price ?
                                    (<span className="text-danger bg-warning-subtle" >
                                        Product Price is required.
                                    </span>) : null
                                }
                            </div>

                            <div className="w-100 mt-3">
                                <label htmlFor="description" className="form-label">Product Description</label>
                                <textarea className="form-control" name="description" value={inputs.description} id="description" onChange={handleChange} placeholder="Enter your product description"></textarea>
                                {errors.description ?
                                    (<span className="text-danger bg-warning-subtle" >
                                        Product Description is required.
                                    </span>) : null
                                }
                            </div>

                            <div className="w-100 mt-3">
                                <label htmlFor="ratings" className="form-label">Ratings</label>
                                <input type="number" className="form-control" id="ratings" name="ratings" value={inputs.ratings} onChange={handleChange} placeholder="Enter Product Ratings" />
                                {errors.ratings ?
                                    (<span className="text-danger bg-warning-subtle" >
                                        Product Ratings is required 1 to 5.
                                    </span>) : null
                                }
                            </div>

                            <div className="w-100 mt-3">
                                <label htmlFor="images" className="form-label">Product Images URL</label>
                                <input type="url" className="form-control" id="images" name="images" value={inputs.images} onChange={handleChange} placeholder="Enter Product images URL" />
                                {errors.images ?
                                    (<span className="text-danger bg-warning-subtle" >
                                        Product Images URL is required.
                                    </span>) : null
                                }
                            </div>

                            <div className="w-100 mt-3">
                                <label htmlFor="category" className="form-label">Product Category</label>
                                <select className='form-select' id="category" name="category" value={inputs.category} onChange={handleChange}>
                                    <option value="select">Select Category</option>
                                    <option value="Vegetarian">Vegetarian</option>
                                    <option value="Non-vegetarian">Non-vegetarian</option>
                                    <option value="Vegan">Vegan</option>
                                </select>
                                {errors.category ?
                                    (<span className="text-danger bg-warning-subtle" >
                                        Product Category is required.
                                    </span>) : null
                                }
                            </div>

                            <div className="w-100 mt-3">
                                <label htmlFor="seller" className="form-label">Seller</label>
                                <input type="text" className="form-control" name="seller" value={inputs.seller} id="seller" onChange={handleChange} placeholder="Enter Seller Name" />
                                {errors.seller ?
                                    (<span className="text-danger bg-warning-subtle" >
                                        Seller Name is required.
                                    </span>) : null
                                }
                            </div>

                            <div className="w-100 mt-3">
                                <label htmlFor="stock" className="form-label">Product Stock</label>
                                <input type="number" className="form-control" id="stock" name="stock" value={inputs.stock} onChange={handleChange} placeholder="Enter Product Stock" />
                                {errors.stock ?
                                    (<span className="text-danger bg-warning-subtle" >
                                        Product stock is required.
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

                                <button className="btn btn-primary me-5" type="submit" disabled={loading}>Submit</button>
                                <button className="btn btn-danger" type="reset" onClick={handleReset}>Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}