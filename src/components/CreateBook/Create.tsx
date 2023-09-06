import { useEffect, useState } from "react";
import "./Create.style.css";
import axios from "axios";
import GenreDto from "../Types/GenreDto";
import AuthorDto from "../Types/AuthorDto";

const Create = () => {
    const [genre, setGenre] = useState([] as GenreDto[]);
    const [author, setAuthor] = useState([] as AuthorDto[]);
    

  useEffect(() => {
    axios.get<GenreDto[]>("https://localhost:7196/api/Genre/GetListOfGenres")
      .then((response) => {
        setGenre(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get<AuthorDto[]>("https://localhost:7196/api/Author/GetListOfAuthors")
      .then((response) => {
        setAuthor(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

    return (
        <div className="add-book-container">
            <p className="title">Add book</p>
            <div className="container">
            <div className="genre-select-field">
                <select>
                    {genre.map((item) => (
                    <option key={item.id} value={item.genreName}>
                        {item.genreName}
                    </option>
                    ))}
                </select>
            </div>
            <div className="author-select-field">
                <select>
                    {author.map((item) => (
                    <option key={item.id} value={item.authorName}>
                        {item.authorName}
                    </option>
                    ))}
                </select>
            </div>
                <input type="text" placeholder="Title" />
                <input type="number" placeholder="Year"/>
                <button className="submit-btn">Submit</button>
            </div>

            
        </div>
    )
}

export default Create;