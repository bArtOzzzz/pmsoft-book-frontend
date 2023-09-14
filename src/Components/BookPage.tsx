import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BookResponse from "../Models/BookResponse";
import jwt_decode from 'jwt-decode';
import TokensModel from "../Models/TokensModel";
import RefreshTokenModel from "../Models/RefreshTokenModel";
import { GetListOfBooks } from "../Api/api.service";
import { DeleteBook } from "../Api/api.service";
import { useAxiosRequest, useAxiosResponse } from "../Services/Auth.interceptor";

const BookPage = () => {
    const navigate = useNavigate();
    const [bookList, setBookList] = useState([] as BookResponse[]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const axiosRequest = useAxiosRequest();
    const axiosResponse = useAxiosResponse();

    const refreshValues: RefreshTokenModel = {
        id: '',
        accessToken: '',
        refreshToken: ''
    };

    useEffect(() => {
        RefreshToken();
    }, []);

    useEffect(() => {
        GetListOfBooks().then((data) => setBookList(data));
    }, []);

    const DeleteBookAsync = async (bookId: string) => {
        await DeleteBook(bookId);
    }

    async function RefreshToken() {
        const token = localStorage.getItem("token");

        if (token !== null) {
            const decodedToken = jwt_decode(token) as TokensModel;
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp < currentTime) {
                console.log("Token expired");
                setIsLoggedIn(false);
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

    async function deleteBook(id: string) {
        axiosRequest();
        axiosResponse();

        if (id !== null && id !== undefined) {    
            DeleteBookAsync(id);
            navigate("/book");
            window.location.reload();
        }
    }

    return (
        <>
        <p className="title">Books</p>
        <div className="container">
            <div className="table-conteiner">
                <div className="create-container">
                    {
                        isLoggedIn ? (
                            <Link to="create" className="create-btn">Create</Link>
                        ) : (
                            <a href="#" className="create-btn disabled-btn">[Disabled]</a>
                        )
                    }
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Year</th>
                            <th>Genre</th>
                            <th>Author</th>
                            {
                               isLoggedIn ? (
                                <th>Action</th>
                               ) : (
                                <th>[Disabled]</th>
                               )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {bookList.map((book) => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.name}</td>
                            <td>{book.year}</td>
                            <td>{book.genre?.genreName}</td>
                            <td>{book.author?.authorName}</td>
                            {
                                isLoggedIn ? (
                                    <td className="action-container">
                                        <Link to={`update/${book.id}`} className="edit-btn">Edit</Link>
                                        <a href="#" className="delete-btn" onClick={() => deleteBook(book.id)}>Delete</a>
                                    </td>
                                ) : (
                                    <td>[Disabled]</td>
                                )
                            }
                        </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
        </> 
    )
}

export default BookPage;