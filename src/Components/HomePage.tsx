import { Routes, Route, Link, useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import BookPage from "./BookPage";
import HomeContent from "./HomeContent";
import CreateBookPage from "./CreateBookPage";
import UpdateBookPage from "./UpdateBookPage";
import { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
import TokensModel from "../Models/TokensModel";
import axios from "axios";
import RefreshTokenModel from "../Models/RefreshTokenModel";

const HomePage = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const refreshValues: RefreshTokenModel = {
        id: '',
        accessToken: '',
        refreshToken: ''
    };

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
                AxiosRequest();
                AxiosResponse();
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

    function AxiosRequest() {
        axios.interceptors.request.use((config) => {
            const token = localStorage.getItem('token');
          
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
              console.log("successfull request!");
            }
            else {
                alert("Oops seems like you not logged in or not registered!");
                setTimeout(() => {
                    navigate("/login");
                    window.location.reload();
                }, 1000)
            }
          
            return config;
          });
    }

    async function AxiosResponse() {
        const accessToken = localStorage.getItem('token');
        const decodedToken = jwt_decode(accessToken!) as TokensModel;
        const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    
        const getRefreshToken = await axios.get('https://localhost:7196/api/Authentication/GetRefreshTokenByUser/' + userId);
    
        if (getRefreshToken) {
            const RefreshToken = (values: RefreshTokenModel) => {
                values.id = userId;
                values.accessToken = accessToken!;
                values.refreshToken = getRefreshToken.data;
            }
    
            RefreshToken(refreshValues);
        }
    
        const accessTokenResponse = await axios.post('https://localhost:7196/api/Authentication/RefreshToken', refreshValues);
        const newAccessToken = accessTokenResponse.data;
        localStorage.setItem('token', newAccessToken);

        setIsLoggedIn(true);
        RefreshToken();
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
                    {
                        isLoggedIn ? (
                            <li>
                                <Link to="book" className="link-book">Books</Link>
                            </li> 
                        ) : (
                            <span className="disabled-link">[disabled link]</span>
                        )
                    }
                    
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