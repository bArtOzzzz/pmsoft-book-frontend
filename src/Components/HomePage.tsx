import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./LoginPage";
import BookPage from "./BookPage";
import HomeContent from "./HomeContent";
import CreateBookPage from "./CreateBookPage";

const HomePage = () => {
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
                    <li>
                        <Link to="login" className="link-login">Login</Link>
                    </li> 
                    <li>
                        <a className="link-logout">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
        
        <Routes>
            <Route path="home" element={<HomeContent />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="book/*" element={<BookPage />} />
            <Route path="book/create" element={<CreateBookPage />} />
        </Routes>
        </>
    )
}

export default HomePage;