import { useEffect, useState } from "react";
import "./Create.style.css";
import axios from "axios";
import GenreDto from "../Types/GenreDto";
import AuthorDto from "../Types/AuthorDto";
import { useNavigate } from "react-router";

const Create = () => {
    const navigate = useNavigate();
    const [genre, setGenre] = useState([] as GenreDto[]);
    const [author, setAuthor] = useState([] as AuthorDto[]);

    const onSubmit = (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const genreId = e.currentTarget.querySelector('.genre-select-field select')?.options[e.currentTarget.querySelector('.genre-select-field select')?.selectedIndex].id;
        const authorId = e.currentTarget.querySelector('.author-select-field select')?.options[e.currentTarget.querySelector('.author-select-field select')?.selectedIndex].id;

        const data = {
            genreId: genreId,
            authorId: authorId,
            name: formData.get('name'),
            year: formData.get('year')
        };

        axios.post('https://localhost:7196/api/Book/CreateBook', data)
        .then(response => {
            if (response) {
                navigate("/");
                window.location.reload();
            }
        }).catch(error => {
            console.log(error);
        });
    }

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.get<GenreDto[]>("https://localhost:7196/api/Genre/GetListOfGenres")
    .then((response) => {
        setGenre(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.get<AuthorDto[]>("https://localhost:7196/api/Author/GetListOfAuthors")
    .then((response) => {
        setAuthor(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

    return (
        <form action="" onSubmit={onSubmit}>
            <div className="add-book-container">
            <p className="title">Add book</p>
            <div className="container">
            <div className="genre-select-field">
                <select name="genreName">
                    {genre.map((item) => (
                    <option key={item.id} value={item.genreName} id={item.id}>
                        {item.genreName}
                    </option>
                    ))}
                </select>
            </div>
            <div className="author-select-field">
                <select>
                    {author.map((item) => (
                    <option key={item.id} value={item.authorName} id={item.id}>
                        {item.authorName}
                    </option>
                    ))}
                </select>
            </div>
                <input type="text" placeholder="Title" name="name" />
                <input type="number" placeholder="Year" name="year"/>
                <button className="submit-btn" type="submit">Submit</button>
            </div>
            </div>
        </form>
    )
}

export default Create;