import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import BookResponse from "../Models/BookResponse";
import CreateBookPage from "./CreateBookPage";

const BookPage = () => {
    const [bookList, setBookList] = useState([] as BookResponse[]);

    useEffect(() => {
        axios.get<BookResponse[]>("https://localhost:7196/api/Book/GetListOfBooks").then((response) => {
            setBookList(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

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
                                <Link to={`/update/${book.id}`} className="edit-btn">Edit</Link>
                                <a href="#" className="delete-btn">Delete</a>
                                {/* <div className="action-container">
                                    <Link to={`/update/${book.id}`} className="edit-btn">Edit</Link>
                                    <button className="delete-btn" onClick={() => deleteBook(book.id)}>Delete</button>
                                </div> */}
                            </td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
            <Routes>
                <Route path="create" element={<CreateBookPage />} />
            </Routes>
        </> 
    )
}

export default BookPage;