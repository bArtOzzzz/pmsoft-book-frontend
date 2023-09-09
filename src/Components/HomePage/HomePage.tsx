import { Routes, Route } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";
import "./HomePage.style.css";
import BookPage from "../BookPage/BookPage";
import Home from "./Home";

const HomePage = () => {
    return (
        <>
        <div className="header">
            <a href="/home" className="logo">PMSOFT</a>
            <hr className="vertical-line" />
            <div className="header-link-container">
                <ul className="link-container">
                    <li>
                        <a href="/book" className="link-book">Books</a>
                    </li> 
                </ul>
            </div>
            <div className="authorization-container">
                <ul className="link-container">
                    <li>
                        <a href="/login" className="link-login">Login</a>
                    </li> 
                    <li>
                        <a className="link-logout">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/book" element={<BookPage />} />
        </Routes>
        </>
    )
}

export default HomePage;