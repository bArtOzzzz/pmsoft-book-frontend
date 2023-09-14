import { Field, Formik, Form, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import * as Yup from 'yup';
import GenreModel from "../Models/GenreModel";
import AuthorModel from "../Models/AuthorModel";
import UpdateBookModel from "../Models/UpdateBookModel";
import { useAxiosRequest, useAxiosResponse } from "../Services/Auth.interceptor";
import { GetListOfGenres, GetListOfAuthors, UpdateBook } from "../Api/api.service";

const UpdateBookPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [genre, setGenre] = useState([] as GenreModel[]);
    const [author, setAuthor] = useState([] as AuthorModel[]);
    const [genreId, setGenreId] = useState('');
    const [authorId, setAuthorId] = useState('');
    const axiosRequest = useAxiosRequest();
    const axiosResponse = useAxiosResponse();

    useEffect(() => {
        GetListOfGenres().then((data) => setGenre(data));
    }, []);

    useEffect(() => {
        GetListOfAuthors().then((data) => setAuthor(data));
    }, []);
    
    const initialValues: UpdateBookModel = {
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
        name: Yup.string().required('Required'),
        year: Yup.number().positive().required('Required')
    });
    
      const onSubmit = async (values: UpdateBookModel) => {
        if (genreId !== null && genreId !== undefined 
            && authorId !== null && authorId !== undefined) {
                values.authorId = authorId;
                values.genreId = genreId;
            }

            axiosRequest();
            axiosResponse();

            if (id !== null && id !== undefined) {
                
                const response = await UpdateBook(id, values);

                if (response) {
                    navigate("/book");
                    window.location.reload();
                }
            }  
      };

    return (
        <>
        <Formik initialValues={initialValues} 
                validationSchema={validationSchema} 
                onSubmit={onSubmit}>
            {({isSubmitting}) => (
                <Form>
                    <p className="title">Update book</p>
                    <div className="container">
                        <div className="select-field">
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
                        <div className="select-field">
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

export default UpdateBookPage;