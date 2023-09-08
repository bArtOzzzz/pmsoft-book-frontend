import axios from "axios";
import { useEffect, useState } from "react";
import Book from "../BookPage/Book";
import Create from "../CreateBook/Create";
import Login from "../LoginPage/Login";
import Update from "../UpdateBook/Update";
import "./Header.style.css";
import { Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from "react-router";
import jwt_decode from "jwt-decode";
import DecodedToken from "../Types/DecodedToken";

const Header = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (token !== null) {
            const decodedToken = jwt_decode(token) as DecodedToken;
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp < currentTime) {
                console.log("Token expired");
                setIsAuthenticated(true);
            } 
            else {
                console.log("Token not expired");
                setIsAuthenticated(true);
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            }
        }
        else {
            navigate("/login");
        }
    }, []);

    function logout() {
        const token = localStorage.getItem("accessToken");
    
        if (token !== null) {
            localStorage.removeItem("accessToken");
            setIsAuthenticated(false);
        }
    
        navigate("/");
        window.location.reload();
    }

    return (
        <>
        <div className="header">
            <p className="logo">PMSOFT</p>
            <hr className="vertical-line" />
            <div className="header-link-container">
                <ul className="link-container">
                    {isAuthenticated ? (
                    <li>
                        <Link to="/" className="link-book">Books</Link>
                    </li>) : (
                    <span className="disabled-link">[disabled link]</span>
                    )} 
                </ul>
            </div>
            <div className="authorization-container">
                <ul className="link-container">
                    {isAuthenticated ? (
                    <span className="disabled-link">[disabled link]</span>) : (
                    <li>
                        <Link to="/login" className="link-login">Login</Link>
                    </li>
                    )} 
                    {isAuthenticated ? (
                    <li>
                        <a className="link-logout" onClick={logout}>Logout</a>
                    </li>) : (
                    <span className="disabled-link">[disabled link]</span>
                    )} 
                </ul>
            </div>
        </div>
        <Routes>
            <Route path="*" element={<Book />} />
            <Route path="/create" element={<Create />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/login" element={<Login />} />
        </Routes>
        </>
    )
};

export default Header;