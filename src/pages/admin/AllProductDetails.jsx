import { useEffect, useState } from "react";
import { DeleteProductApi, GetProductsApi } from "../../services/Api";
import { isAdmin, isAuthenticated } from "../../services/Auth";
import { MDBDataTable } from "mdbreact";
import { toast } from 'react-toastify';
import AdminNavBar from "./AdminNavBar";
import { Link } from "react-router-dom";
import { Navigate } from 'react-router-dom';



export default function AllProductDetails() {

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [update, setUpdate] = useState(0);


    useEffect(() => {
        if (isAuthenticated() && isAdmin()) {
            setLoading(true);
            GetProductsApi().then((response) => {
                setProducts(response.data.products)
            })
            setLoading(false);
        }
    }, [update])

    const productData = () => {
        const data = {
            columns: [
                {
                    label: 'ID  ↕',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name   ↕',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price   ↕',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Category   ↕',
                    field: 'category',
                    sort: 'asc'
                },
                {
                    label: 'Seller   ↕',
                    field: 'seller',
                    sort: 'asc'
                },
                {
                    label: 'Stock   ↕',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions   ↕',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows: []
        }

        const deleteHandler = async(e, id) => {
            e.target.disabled = true;
            DeleteProductApi(id);
            toast.success("Product Deleted Successfully");
            await new Promise(resolve => setTimeout(resolve, 5000));
            setUpdate(update+1);
            e.target.disabled = false;
        }

        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price : `Rs. ${product.price}`,
                category: product.category,
                seller: product.seller,
                stock: product.stock,
                actions: (
                    <>
                        <Link to={`/admin/updateproduct/${product._id}`} className="btn btn-primary"> <i className="fa fa-pencil"></i></Link>
                        <button onClick={e => deleteHandler(e, product._id)} className="btn btn-danger py-1 px-2 ml-2">
                            <i className="fa fa-trash"></i>
                        </button>
                    </>)
            })
        })

        return data;
    }

    if (!isAuthenticated() || !isAdmin()) {
        return <Navigate to="/login" />
    }

    return (
        <>
        <AdminNavBar />
            <div className=" container-fluid p-5">
                <h1 className="my-4">Product List</h1>
                <div>
                    {!loading &&
                        <MDBDataTable
                            data={productData()}
                            bordered
                            striped
                            hover
                            className="px-3"
                        />
                    }
                </div>
            </div>
        </>
    )
}
