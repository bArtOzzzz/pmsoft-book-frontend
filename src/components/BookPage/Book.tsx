import axios from "axios";
import { useState, useEffect } from "react";
import BookResponse from "../Types/BookResponse";
import "./Book.style.css";
import { Link } from "react-router-dom";

const Book = () => {
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
        <div className="table-container">
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
                        <td className="action-cell">
                            <div className="action-container">
                                <Link to={`/update/${book.id}`} className="edit-btn">Edit</Link>
                                <button className="delete-btn" onClick={() => deleteBook(book.id)}>Delete</button>
                            </div>
                        </td>
                    </tr>))}
                </tbody>
            </table>
        </div>
        <div className="create-container">
            <Link to="/create" className="create-btn">Create</Link>
        </div>
        </>
    )
};

async function deleteBook(id: string) {
    await axios.delete(`https://localhost:7196/api/Book/DeleteBook/${id}`);
    window.location.reload();
    console.log("Book was deleted successfully!");
}

export default Book;