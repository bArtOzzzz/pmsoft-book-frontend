import axios from "axios";
import LoginModel from "../Models/LoginModel";
import UpdateBookModel from "../Models/UpdateBookModel";
import CreateBookModel from "../Models/CreateBookModel";
import BookResponse from "../Models/BookResponse";

const baseURL = "https://localhost:7196/api/";

export const Login = async (data: LoginModel) => {
    const response = await axios.post(`${baseURL}Authentication/Login`, data);
    return response.data;
};

export const GetListOfAuthors = async () => {
    const response = await axios.get(`${baseURL}Author/GetListOfAuthors`);
    return response.data;
};

export const GetListOfBooks = async () => {
    const response = await axios.get<BookResponse[]>(`${baseURL}Book/GetListOfBooks`);
    return response.data;
};

export const UpdateBook = async (bookId: string, data: UpdateBookModel) => {
    const response = await axios.put(`${baseURL}Book/UpdateBook/${bookId}`, data);
    return response.data;
};

export const CreateBook = async (data: CreateBookModel) => {
    const response = await axios.post(`${baseURL}Book/CreateBook`, data);
    return response.data;
};

export const DeleteBook = async (bookId: string) => {
    const response = await axios.delete(`${baseURL}Book/DeleteBook/${bookId}`);
    return response.data;
};

export const GetListOfGenres = async () => {
    const response = await axios.get(`${baseURL}Genre/GetListOfGenres`);
    return response.data;
};