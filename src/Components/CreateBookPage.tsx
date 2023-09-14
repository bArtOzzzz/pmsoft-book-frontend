import { Field, Formik, Form, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import * as Yup from 'yup';
import GenreModel from "../Models/GenreModel";
import AuthorModel from "../Models/AuthorModel";
import CreateBookModel from "../Models/CreateBookModel";
import { useAxiosRequest, useAxiosResponse } from "../Services/Auth.interceptor";
import { CreateBook, GetListOfAuthors, GetListOfGenres } from "../Api/api.service";

const CreateBookPage = () => {
    const navigate = useNavigate();
    const [genre, setGenre] = useState([] as GenreModel[]);
    const [author, setAuthor] = useState([] as AuthorModel[]);
    const axiosRequest = useAxiosRequest();
    const axiosResponse = useAxiosResponse();
    const [genreId, setGenreId] = useState('');
    const [authorId, setAuthorId] = useState('');

    useEffect(() => {
        GetListOfGenres().then((data) => setGenre(data));
    }, []);

    useEffect(() => {
        GetListOfAuthors().then((data) => setAuthor(data));
    }, []);
    
    const initialValues: CreateBookModel = {
        genreId: '',
        authorId: '',
        name: '',
        year: 0,
    };

    function handleChangeAuthor(event: any) {
        setAuthorId(event.target.value);
    }

    function handleChangeGenre(event: any) {
        setGenreId(event.target.value);
    }

    const validationSchema = Yup.object({
        genreId: Yup.string(),
        authorId: Yup.string(),
        name: Yup.string().required('Required'),
        year: Yup.number().positive().required('Required'),
      });
    
      const onSubmit = async (values: CreateBookModel) => {
        if (genreId !== null && genreId !== undefined 
            && authorId !== null && authorId !== undefined) {
                values.authorId = authorId;
                values.genreId = genreId;
            }

            axiosRequest();
            axiosResponse();

            const response = await CreateBook(values);

            if (response) {
                navigate("/book");
                window.location.reload();
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
                            <select name="genreId" onChange={handleChangeGenre}>
                                <option value="">Choose genre:</option>
                                {genre.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.genreName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="select-field author-select-field">
                            <label className="item-name">Author:</label>
                            <select name="authorId" onChange={handleChangeAuthor}>
                                <option value="">Choose author:</option>
                                {author.map((item) => (
                                    <option key={item.id} value={item.id}>
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