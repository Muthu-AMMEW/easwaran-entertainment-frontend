import { useEffect, useState } from "react";
import VideoCard from '../components/VideoCard';
import { useSearchParams } from 'react-router-dom';
import { GetVideosApi } from "../services/Api";
import './Home.css';
import Loader from "../components/Loader";


export default function Home() {

    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();

    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line
    const [postPerPage, setPostPerPage] = useState(6);

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;

    const currentPosts = videos.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(videos.length / postPerPage);

    const paginate = (page) => setCurrentPage(page);

    useEffect(() => {
        async function api() {
            try {
                setLoading(true);
                await GetVideosApi(searchParams).then(res => setVideos(res.data.videos));
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        api();
    }, [searchParams])

    return (
        <>
            {loading ? <Loader /> : videos.length === 0 ? <div className="bodyBGPic text-center h2 text-white mb-0" style={{paddingTop: '200px', paddingBottom:"200px"}}>Not Found</div> :
                <>
                    <section id="videos" className="container-fluid text-center bodyBGPic">

                        {currentPosts.map((video) => <VideoCard key={video._id} video={video} />)}

                        <nav aria-label="Page Navigation">
                            <ul class="pagination justify-content-center">
                                <li class="page-item"><button className="btn btn-sm btn-info border-black" disabled={currentPage === 1} onClick={() => paginate(1)}>First</button></li>
                                <li class="page-item"><button className="btn btn-sm btn-info border-black" disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>Previous</button></li>

                                {new Array(totalPages).fill(0).map((_, index) => {
                                    return (
                                        <li class="page-item"><button className={currentPage === index + 1 ? "active text-bg-success btn btn-sm btn-info border-black" : "btn btn-sm btn-info border-black"} onClick={() => paginate(index + 1)} key={index + 1}>{index + 1}</button></li>

                                    );
                                })}

                                <li class="page-item"><button className="btn btn-sm btn-info border-black" disabled={currentPage === totalPages} onClick={() => paginate(currentPage + 1)}>Next</button></li>
                                <li class="page-item"><button className="btn btn-sm btn-info border-black" disabled={currentPage === totalPages} onClick={() => paginate(totalPages)}>Last</button></li>
                            </ul>
                        </nav>

                        <div className="d-block" >
                            <a className="btn btn-danger youtubeRed w-75" href="https://www.youtube.com/@EaswaranEntertainment">Watch More Videos Visit Our Youtube Channel<i className="bi bi-youtube mx-2"></i>Easwaran Entertainment</a>
                        </div>

                    </section>
                </>}
        </>
    )
}