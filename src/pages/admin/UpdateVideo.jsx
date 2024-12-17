import { useEffect, useState } from 'react'
import { VideoDetailsApi, UpdateVideoApi } from '../../services/Api';
import { isAdmin, isAuthenticated } from '../../services/Auth';
import { toast } from 'react-toastify';
import { Navigate, useParams } from 'react-router-dom';


export default function UpdateVideo() {


    const [inputs, setInputs] = useState({
        sno: "",
        title: "",
        description: "",
        videos: "",
        keywords: "",
        notes: ""
    })


    const initialStateErrors = {
        sno: false,
        title: false,
        description: false,
        videos: false,
        keywords: false,
        notes: false,
        custom_error: null
    };
    const [errors, setErrors] = useState(initialStateErrors);

    const [loading, setLoading] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        if (isAuthenticated() && isAdmin()) {

            VideoDetailsApi(id).then((response) => {
                setInputs(values => ({
                    ...values,
					sno: response.data.video.sno,
                    title: response.data.video.title,
                    description: response.data.video.description,
                    videos: response.data.video.videoLink,
                    keywords: response.data.video.keywords,
                    notes: response.data.video.notes
                }));
            })
        }
    }, [id])



    const handleSubmit = (event) => {
        event.preventDefault();
        let errors = initialStateErrors;
        let hasError = false;
        if (inputs.title === "") {
            errors.title = true;
            hasError = true;
        }
        if (inputs.sno === "") {
            errors.sno = true;
            hasError = true;
        }
        if (inputs.description === "") {
            errors.description = true;
            hasError = true;
        }

        if (inputs.videos === "") {
            errors.videos = true;
            hasError = true;
        }
        if (inputs.keywords === "") {
            errors.keywords = true;
            hasError = true;
        }
        if (inputs.notes === "") {
            errors.notes = true;
            hasError = true;
        }
        if (!hasError && isAuthenticated() && isAdmin()) {
            setLoading(true)
            async function api() {
                try {
                    UpdateVideoApi(inputs, id);
                    toast.success("Video Updated Successfully");
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
            title: "",
            sno: "",
            description: "",
            videos: "",
            keywords: "",
            notes: ""
        })
        toast.info("Reset Successfully");
    }

    if (!isAuthenticated() || !isAdmin()) {
        return <Navigate to="/login" />
    }

    return (
        <>
            <div className="row min-vw-100 min-vh-100 justify-content-center align-items-center bgpic">
                <div className="col-11 col-sm-8 col-md-7 col-lg-6 col-xl-5">

                    <div className="d-flex flex-column justify-content-center align-items-center w-100 p-5 rounded-5 bg-body-tertiary bg-opacity-50">
                        <div className='text-center h2'>Update Video</div>
                        <form className="w-100" onSubmit={handleSubmit}>
                            <div className="w-100 mt-3">
                                <label htmlFor="title" className="form-label">Video Title</label>
                                <input type="text" className="form-control" name="title" value={inputs.title} id="title" onChange={handleChange} placeholder="Enter Video Title" />
                                {errors.title ?
                                    (<span className="text-danger bg-warning-subtle" >
                                        Video Title is required.
                                    </span>) : null
                                }
                            </div>

                            <div className="w-100 mt-3">
                                <label htmlFor="sno" className="form-label">Video S.No.</label>
                                <input type="number" className="form-control" id="sno" name="sno" value={inputs.sno} onChange={handleChange} placeholder="Enter Video S.No." />
                                {errors.sno ?
                                    (<span className="text-danger bg-warning-subtle" >
                                        Video S.No. is required.
                                    </span>) : null
                                }
                            </div>

                            <div className="w-100 mt-3">
                                <label htmlFor="description" className="form-label">Video Description</label>
                                <textarea className="form-control" name="description" value={inputs.description} id="description" onChange={handleChange} placeholder="Enter your video description"></textarea>
                                {errors.description ?
                                    (<span className="text-danger bg-warning-subtle" >
                                        Video Description is required.
                                    </span>) : null
                                }
                            </div>

                            <div className="w-100 mt-3">
                                <label htmlFor="videos" className="form-label">Video Images URL</label>
                                <input type="url" className="form-control" id="videos" name="videos" value={inputs.videos} onChange={handleChange} placeholder="Enter Video videos URL" />
                                {errors.videos ?
                                    (<span className="text-danger bg-warning-subtle" >
                                        Video Images URL is required.
                                    </span>) : null
                                }
                            </div>

                            <div className="w-100 mt-3">
                                <label htmlFor="keywords" className="form-label">Keywords</label>
                                <input type="text" className="form-control" name="keywords" value={inputs.keywords} id="keywords" onChange={handleChange} placeholder="Enter Keywords Name" />
                                {errors.keywords ?
                                    (<span className="text-danger bg-warning-subtle" >
                                        Keywords Name is required.
                                    </span>) : null
                                }
                            </div>

                            <div className="w-100 mt-3">
                                <label htmlFor="notes" className="form-label">Video Notes</label>
                                <input type="text" className="form-control" id="notes" name="notes" value={inputs.notes} onChange={handleChange} placeholder="Enter Video Notes" />
                                {errors.notes ?
                                    (<span className="text-danger bg-warning-subtle" >
                                        Video notes is required.
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