import { useEffect, useState } from "react";
import { DeleteVideoApi, GetVideosApi } from "../../services/Api";
import { isAdmin, isAuthenticated } from "../../services/Auth";
import { MDBDataTable } from "mdbreact";
import { toast } from 'react-toastify';
import AdminNavBar from "./AdminNavBar";
import { Link } from "react-router-dom";
import { Navigate } from 'react-router-dom';



export default function AllVideoDetails() {

    const [loading, setLoading] = useState(false);
    const [videos, setVideos] = useState([]);
    const [update, setUpdate] = useState(0);


    useEffect(() => {
        if (isAuthenticated() && isAdmin()) {
            setLoading(true);
            GetVideosApi().then((response) => {
                setVideos(response.data.videos)
            })
            setLoading(false);
        }
    }, [update])

    const videoData = () => {
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
            DeleteVideoApi(id);
            toast.success("Video Deleted Successfully");
            await new Promise(resolve => setTimeout(resolve, 5000));
            setUpdate(update+1);
            e.target.disabled = false;
        }

        videos.forEach(video => {
            data.rows.push({
                id: video._id,
                name: video.name,
                price : `Rs. ${video.price}`,
                category: video.category,
                seller: video.seller,
                stock: video.stock,
                actions: (
                    <>
                        <Link to={`/admin/updatevideo/${video._id}`} className="btn btn-primary"> <i className="fa fa-pencil"></i></Link>
                        <button onClick={e => deleteHandler(e, video._id)} className="btn btn-danger py-1 px-2 ml-2">
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
                <h1 className="my-4">Video List</h1>
                <div>
                    {!loading &&
                        <MDBDataTable
                            data={videoData()}
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
