import axios from "axios";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import * as Yup from 'yup';
import GenreModel from "../Models/GenreModel";
import AuthorModel from "../Models/AuthorModel";
import CreateBookModel from "../Models/CreateBookModel";
import jwt_decode from 'jwt-decode';
import { json } from "stream/consumers";
import TokensModel from "../Models/TokensModel";
import RefreshTokenModel from "../Models/RefreshTokenModel";

const CreateBookPage = () => {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');
    const [genre, setGenre] = useState([] as GenreModel[]);
    const [author, setAuthor] = useState([] as AuthorModel[]);
    const [genreId, setGenreId] = useState('');

    useEffect(() => {
        axios.get<GenreModel[]>("https://localhost:7196/api/Genre/GetListOfGenres")
        .then((response) => {
            setGenre(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        axios.get<AuthorModel[]>("https://localhost:7196/api/Author/GetListOfAuthors")
        .then((response) => {
            setAuthor(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    function AxiosResponse() {
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
    
    const initialValues: CreateBookModel = {
        genreId: '',
        authorId: '',
        name: '',
        year: 0,
    };

    const refreshValues: RefreshTokenModel = {
        id: '',
        accessToken: '',
        refreshToken: ''
    };

    const validationSchema = Yup.object({
        genreId: Yup.string(),
        authorId: Yup.string(),
        name: Yup.string().required('Required'),
        year: Yup.number().positive().required('Required'),
      });
    
      const onSubmit = async (values: CreateBookModel) => {
        const genre = document.getElementsByName("genreName")[0];
        const genreId = genre.querySelector('option')?.getAttribute('id');
        const author = document.getElementsByName("authorName")[0];
        const authorId = author.querySelector('option')?.getAttribute('id');

        if (genreId != null && genreId != undefined 
            && authorId != null && authorId != undefined) {
                values.authorId = authorId;
                values.genreId = genreId;
            }

        try {
                AxiosResponse();

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

                        onSubmit(values);
                    }
                    
                    return Promise.reject(error);
                    }
                );

                const response = await axios.post('https://localhost:7196/api/Book/CreateBook', values);

                if (response) {
                    navigate("/book");
                    window.location.reload();
                }
        } catch (error: any) {
            setLoginError(error.response.data.message);
        }
      };

    return (
        <>
        <Formik initialValues={initialValues} 
                validationSchema={validationSchema} 
                onSubmit={onSubmit}>
            {({isSubmitting}) => (
                <Form>
                    <p className="title">Add book</p>
                    <div className="container">
                        <div className="select-field genre-select-field">
                            <label className="item-name">Genre:</label>
                            <select name="genreName">
                                {genre.map((item) => (
                                <option key={item.id} value={item.genreName} id={item.id}>
                                    {item.genreName}
                                </option>
                                ))}
                            </select>
                        </div>
                        <div className="select-field author-select-field">
                            <label className="item-name">Author:</label>
                            <select name="authorName">
                                {author.map((item) => (
                                <option key={item.id} value={item.authorName} id={item.id}>
                                    {item.authorName}
                                </option>
                                ))}
                            </select>
                        </div>
                        <div className="input-field">
                            <label className="item-name">Name of book:</label>
                            <Field type="text" name="name" />
                            <div className='error-message'>
                                <ErrorMessage name="name" />
                            </div>
                        </div>
                        <div className="input-field">
                            <label className="item-name">Publication year:</label>
                            <Field type="number" name="year" />
                            <div className='error-message'>
                                <ErrorMessage name="year" />
                            </div>
                        </div>
                        <button className="submit-btn" type="submit" disabled={isSubmitting}>Submit</button>
                    </div>
                </Form>
            )}
        </Formik>
        </>
    )
}

export default CreateBookPage;