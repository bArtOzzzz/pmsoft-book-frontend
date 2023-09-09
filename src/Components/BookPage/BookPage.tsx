import "./BookPage.style.css";

const BookPage = () => {
    return (
        <>
        <p className="title-book">Books</p>
        <div className="container">
            <div className="table-conteiner">
                <div>
                    <a href="/create" className="create-btn">Create</a>
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
                        <tr>
                            <td>Test</td>
                            <td>Test</td>
                            <td>Test</td>
                            <td>Test</td>
                            <td>Test</td>
                        <td className="action-container">
                            <a href="#" className="edit-btn">Edit</a>
                            <a href="#" className="delete-btn">Delete</a>
                        </td>
                        </tr>
                        {/* {bookList.map((book) => (
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
                        </tr>))} */}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}

export default BookPage;