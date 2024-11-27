import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const searchHandler = () => {
        navigate('/search?keyword=' + keyword)
    }
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            searchHandler();
        }
    };

    return (<>
        <div>
            <div className="d-flex form-control border-danger">
                <input className="flex-grow-1 border-0" type="search" onBlur={searchHandler} placeholder="Enter Product Name ..." onChange={(e) => setKeyword(e.target.value)} onKeyDown={handleKeyDown} style={{ outline: "none" }} aria-label="Search" />
                <i className="fa-solid fa-magnifying-glass fa-bounce ms-3 mt-1" onClick={searchHandler}></i>
            </div>
        </div>
    </>)
}