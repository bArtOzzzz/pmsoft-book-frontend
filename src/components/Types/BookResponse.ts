import AuthorDto from "./AuthorDto";
import GenreDto from "./GenreDto";

type BookResponse = {
    id: string;
    name?: string;
    year: number;
    genre?: GenreDto;
    author?: AuthorDto;
};

export default BookResponse;