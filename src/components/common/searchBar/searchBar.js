import React from 'react';
import { Link } from 'react-router-dom';

import './searchBar.css';

const SearchBar = ({onSearch, onChange}) => {
    return (
        <div className="row justify-content-end body-SearchBar mx-0 p-3">
            <div className="col-md-2 p-3">
                <input 
                    className="form-control searchBar-custom" 
                    type="search" 
                    placeholder="Search" 
                    aria-label="Search" 
                    onChange={onChange}
                />
            </div>
            <div className="col-md-1 p-3">
                <Link to="/Search">
                    <button className="btn btn-outline-secondary searchBarButton-custom" onClick={onSearch}>Search</button>
                </Link>
            </div>
        </div>  
    );
};

export default SearchBar;
