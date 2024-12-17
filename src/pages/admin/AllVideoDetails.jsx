import { useEffect, useState } from "react";
import { DeleteVideoApi, GetVideosApi } from "../../services/Api";
import { isAdmin, isAuthenticated } from "../../services/Auth";
import { MDBDataTable } from "mdbreact";
import { toast } from 'react-toastify';
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
                    label: 'S.No.   ↕',
                    field: 'sno',
                    sort: 'asc'
                },
                {
                    label: 'ID  ↕',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Title   ↕',
                    field: 'title',
                    sort: 'asc'
                },
                
                {
                    label: 'Notes   ↕',
                    field: 'notes',
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
                sno: video.sno,
                id: video._id,
                title: video.title,
                notes: video.notes,
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
            <div className="container-fluid p-5 bodyBGPic">
                <h1 className="text-white-50">Video List</h1>
                <div className="bg-body-tertiary bg-opacity-50">
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
