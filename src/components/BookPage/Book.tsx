import axios from "axios";
import { useState, useEffect } from "react";
import BookResponse from "../Types/BookResponse";
import "./Book.style.css";

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
        <div className="table-container">
            <p className="title">Books</p>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Year</th>
                        <th>Genre</th>
                        <th>Author</th>
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
                    </tr>))}
                </tbody>
            </table>
        </div>
        </>
    )
};

export default Book;