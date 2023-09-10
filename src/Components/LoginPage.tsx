import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');

    interface LoginValues {
        email: string;
        password: string;
      }
    
    const initialValues: LoginValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
      });
    
      const onSubmit = async (values: LoginValues) => {
        try {
          const response = await axios.post('https://localhost:7196/api/Authentication/Login', values);
          localStorage.setItem('token', response.data.accessToken);
          navigate('/home');
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
                    <p className="title-login">Login</p>
                    <div className="container">
                        <div className="email-container">
                            <Field type="email" name="email" placeholder="Email" />
                            <div className='error-message'>
                                <ErrorMessage name="email" />
                            </div>
                        </div>
                        <div className="password-container">
                            <Field type="password" name="password" placeholder="Password" />
                            <div className='error-message'>
                                <ErrorMessage name="password" />
                            </div>
                        </div>
                        {
                            loginError && (
                                <div style={{ color: 'red' }}>{loginError}</div>
                            )
                        }
                        <button type="submit" className="submit-btn" disabled={isSubmitting}>Submit</button>
                    </div>
                </Form>
            )}
        </Formik>
        </>
    )
}

export default LoginPage;