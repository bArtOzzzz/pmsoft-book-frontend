import { Routes, Route, Link, useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import BookPage from "./BookPage";
import HomeContent from "./HomeContent";
import CreateBookPage from "./CreateBookPage";
import UpdateBookPage from "./UpdateBookPage";
import { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
import TokensModel from "../Models/TokensModel";
import { useAxiosRequest, useAxiosResponse } from "../Services/Auth.interceptor";

const HomePage = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const axiosRequest = useAxiosRequest();
    const axiosResponse = useAxiosResponse();

    useEffect(() => {
        RefreshToken();
    }, []);

    function RefreshToken() {
        const token = localStorage.getItem("token");

        if (token !== null) {
            const decodedToken = jwt_decode(token) as TokensModel;
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp < currentTime) {
                console.log("Token expired");
                setIsLoggedIn(false);
                axiosRequest();
                axiosResponse();
            } 
            else {
                console.log("Token not expired");
                setIsLoggedIn(true);
            }
        }
        else {
            navigate("/login");
        }
    }

    function Logout() {
        const token = localStorage.getItem('token');

        if (token != null) {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
        }

        navigate("/");
        window.location.reload();
    }

    return (
        <>
        <div className="header">
            <Link to="home" className="logo">PMSOFT</Link>
            <hr className="vertical-line" />
            <div className="header-link-container">
                <ul className="link-container">
                    <li>
                        <Link to="book" className="link-book">Books</Link>
                    </li> 
                </ul>
            </div>
            <div className="authorization-container">
                <ul className="link-container">
                    {
                        isLoggedIn ? (
                            <li>
                                <a className="link-logout" onClick={() => Logout()}>Logout</a>
                            </li>
                        ) : (
                            <li>
                                <Link to="login" className="link-login">Login</Link>
                            </li> 
                        )
                    }
                </ul>
            </div>
        </div>
        
        <Routes>
            <Route path="home" element={<HomeContent />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="book/*" element={<BookPage />} />
            <Route path="book/create" element={<CreateBookPage />} />
            <Route path="book/update/:id" element={<UpdateBookPage />} />
        </Routes>
        </>
    )
}

export default HomePage;