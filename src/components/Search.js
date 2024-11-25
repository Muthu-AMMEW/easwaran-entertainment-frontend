import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const searchHandler = () => {
        navigate('/search?keyword=' + keyword)
    }

    return (<form className="d-flex" role="search">
        <input
            type="search"
            id="search_field"
            onChange={(e) => setKeyword(e.target.value)}
            className="form-control me-2"
            onBlur={searchHandler}
            placeholder="Enter Product Name ..."
             aria-label="Search"
        />
            <button className="btn btn-outline-danger" type='submit' onClick={searchHandler} id="search_btn">
                <i className="fa fa-search" aria-hidden="true"></i>
            </button>
    </form>)
}