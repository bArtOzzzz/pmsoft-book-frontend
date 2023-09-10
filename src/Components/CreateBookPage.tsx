import axios from "axios";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import * as Yup from 'yup';
import GenreModel from "../Models/GenreModel";
import AuthorModel from "../Models/AuthorModel";

const CreateBookPage = () => {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');
    const [genre, setGenre] = useState([] as GenreModel[]);
    const [author, setAuthor] = useState([] as AuthorModel[]);

    interface CreateBookValues {
        genreId: string;
        authorId: string;
        name: string;
        year: number;
      }
    
    const initialValues: CreateBookValues = {
        genreId: '',
        authorId: '',
        name: '',
        year: 0,
    };

    const validationSchema = Yup.object({
        // genreId: Yup.string().required('Required'),
        // authorId: Yup.string().required('Required'),
        // name: Yup.string().required('Required'),
        // year: Yup.number().required('Required'),
      });
    
      const onSubmit = async (values: CreateBookValues) => {
        console.log(values);
        try {
        //   const response = await axios.post('https://localhost:7196/api/Book/CreateBook', values);
          console.log(values);
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
                        <div className="select-field">
                            <label className="item-name">Genre:</label>
                            <select name="genreName">
                                {genre.map((item) => (
                                <option key={item.id} value={item.genreName} id={item.id}>
                                    {item.genreName}
                                </option>
                                ))}
                            </select>
                        </div>
                        <div className="select-field">
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