import Book from "../BookPage/Book";
import Create from "../CreateBook/Create";
import Update from "../UpdateBook/Update";
import "./Header.style.css";
import { Routes, Route, Link } from 'react-router-dom';
import { useParams } from "react-router-dom";

const Header = () => {
    const { id } = useParams();

    return (
        <>
        <div className="header">
            <p className="logo">PMSOFT</p>
            <hr className="vertical-line" />
            <div className="header-link-container">
                <ul className="link-container">
                    <li>
                        <Link to="/" className="link-book">Books</Link>
                    </li>
                </ul>
            </div>
            <div className="authorization-container">
                <ul className="link-container">
                    <li>
                        <a href="#" className="link-signup">Sign Up</a>
                    </li>
                    <li>
                        <a href="#" className="link-login">Login</a>
                    </li>
                    {/* <li>
                        <a className="link-profile">Hello "Some Name"!</a>
                    </li>
                    <li>
                        <a className="link-logout">Logout</a>
                    </li> */}
                </ul>
            </div>
        </div>
        <Routes>
            <Route path="*" element={<Book />} />
            <Route path="/create" element={<Create />} />
            <Route path="/update/:id" element={<Update />} />
        </Routes>
        </>
    )
};

export default Header;