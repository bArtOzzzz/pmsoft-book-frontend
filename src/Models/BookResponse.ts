import AuthorModel from "./AuthorModel";
import GenreModel from "./GenreModel";

interface BookResponse {
    id: string;
    name?: string;
    year: number;
    genre?: GenreModel;
    author?: AuthorModel;
};

export default BookResponse;