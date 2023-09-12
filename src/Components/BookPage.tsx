import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import BookResponse from "../Models/BookResponse";
import CreateBookPage from "./CreateBookPage";
import jwt_decode from 'jwt-decode';
import TokensModel from "../Models/TokensModel";
import RefreshTokenModel from "../Models/RefreshTokenModel";
import UpdateBookPage from "./UpdateBookPage";

const BookPage = () => {
    const navigate = useNavigate();
    const [bookList, setBookList] = useState([] as BookResponse[]);

    const refreshValues: RefreshTokenModel = {
        id: '',
        accessToken: '',
        refreshToken: ''
    };

    useEffect(() => {
        axios.get<BookResponse[]>("https://localhost:7196/api/Book/GetListOfBooks").then((response) => {
            setBookList(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

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

    async function deleteBook(id: string) {
        AxiosRequest();

        axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response.status === 401) {
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

                    deleteBook(id);
                }
            
                return Promise.reject(error);
            }
        );

        await axios.delete(`https://localhost:7196/api/Book/DeleteBook/${id}`);
        window.location.reload();
        console.log("Book was deleted successfully!");
    }

    return (
        <>
        <p className="title">Books</p>
        <div className="container">
            <div className="table-conteiner">
                <div className="create-container">
                    <Link to="create" className="create-btn">Create</Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Year</th>
                            <th>Genre</th>
                            <th>Author</th>
                            <th>Action</th>
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
                            <td className="action-container">
                                <Link to={`update/${book.id}`} className="edit-btn">Edit</Link>
                                <a href="#" className="delete-btn" onClick={() => deleteBook(book.id)}>Delete</a>
                            </td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
        </> 
    )
}

export default BookPage;