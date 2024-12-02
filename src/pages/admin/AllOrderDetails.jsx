import { useEffect, useState } from "react";
import { AllOrderDetailsApi } from "../../services/Api";
import { isAuthenticated } from "../../services/Auth";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";


export default function AllOrderDetails() {

    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        if (isAuthenticated()) {
            setLoading(true);
            AllOrderDetailsApi().then((response) => {
                console.log(response.data.orders)
                setOrders(response.data.orders)
            })
            setLoading(false);
        }
    }, [])

    const orderData = () => {
        const data = {
            columns : [
                {
                    label: 'Order ID ↕',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name ↕',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email ↕',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Phone No. ↕',
                    field: 'pno',
                    sort: 'asc'
                },
                {
                    label: 'Address ↕',
                    field: 'address',
                    sort: 'asc'
                },
                {
                    label: 'Date ↕',
                    field: 'date',
                    sort: 'asc'
                },

                {
                    label: 'Product ID(Qty)',
                    field: 'actions',
                    sort: 'asc'
                }
                
            ],
            rows : []
        }

        orders.forEach( order => {
            data.rows.push({
                id: order.localId,
                name: order.fullName,
                email : order.email,
                pno: order.pno,
                address: order.address,
                date: order.createdAt,
                actions: (
                    <>
                        {order.cartItems.map(item=>(<>
                            <Link className="me-1" to={`/product/${item.product._id}`}>{item.product._id}</Link>
                            <span className="badge bg-secondary">({item.qty})</span> 
                        </>))}
                    </>)
            })
        })

        return data;
    }
  return (
    <>
    <AdminNavBar />
    <div className=" container-fluid p-5">
            <h1 className="my-4">Order List</h1>
            <div>
                {!loading && 
                    <MDBDataTable
                        data={orderData()}
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
