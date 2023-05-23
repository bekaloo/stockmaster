import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStocks, select } from './homeSlice';
import './Home.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const Home = () => {
    const stocks = useSelector((state) => state.stocks.stocks);
    const loading = useSelector((state) => state.stocks.loading);
    const dispatch = useDispatch();
    useEffect(() => {
        if (stocks.length === 0) dispatch(fetchStocks());
    }, []);

    if (loading) {
        return <h1>...Loading...</h1>
    }
    else {
        return (
            <div>
                <nav className="navbar">
                    <h1>Stocks</h1>
                    <div className="searchbar">
                        <input type="text" />
                        <button><FontAwesomeIcon icon={faSearch} /></button>
                    </div>

                </nav>
                <ul className="companyList">
                    {
                        stocks.map((stock) => (
                            <NavLink to="/details" onClick={() => dispatch(select(stock.id))} key={stock.id} className="companyListItem">
                                <div className="namePrice">
                                    <h3>{stock.companyName}</h3>
                                    <span>Price: ${stock.price}</span>
                                </div>
                                {
                                    stock.beta > 1.7 ? <span className="volatile volatility">Volatile</span> : <span className="stable volatility">Stable</span>}
                            </NavLink>
                        ))
                    }
                </ul>
            </div>
        )
    }

}

export default Home