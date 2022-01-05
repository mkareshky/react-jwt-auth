import { useContext, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import decodeJwt from 'jwt-decode';
import { TextError } from '../../helpers/TextError';
import { getToken, removeToken, setToken } from '../../helpers/auth';
import { UserContext } from '../../contexts/UserContext';
import Register from '../Register';

const Login = () => {
    const [user,] = useContext(UserContext);
    const [registerPage, setRegisterPage] = useState(false);
    const [error, setError] = useState('');
    const [initValues, setInitValues] = useState({
        email: '',
        password: '',
    });

    const submitHandler = () => {
        if (initValues.email === user.email && initValues.password === user.password) {
            setToken(user.jwtToken);
            setError('');
            setInitValues({
                email: '',
                password: '',
            });
        }
        else {
            setError('Invalid username or password');
        }
    };

    const logOutHandler = () => {
        setInitValues({
            email: '',
            password: '',
        });
        removeToken();
    }

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        setInitValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required("Password is required"),
    });

    if (getToken()) {
        return (
            <div >
                <p >Name: {(decodeJwt(getToken())).name}</p>
                <p >Role: {(decodeJwt(getToken())).role}</p>
                <button
                    color="primary"
                    type="submit"
                    onClick={() => logOutHandler()}
                >
                    Log out
                </button>
            </div>
        );
    }
    else if (registerPage) {
        return <Register />
    }
    else {
        return (
            <div >
                <button
                    color="primary"
                    type="submit"
                    onClick={() => setRegisterPage(true)}
                >
                    Register
                </button>
                <Formik
                    validationSchema={validationSchema}
                    initialValues={initValues}
                    onSubmit={submitHandler}
                    enableReinitialize
                >
                    <Form>
                        <h1>Login</h1>
                        <p >Sign In to your account</p>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <div>
                            <Field
                                name="email"
                                value={initValues.email}
                                type="text"
                                placeholder="Username"
                                autoComplete="username"
                                onChange={handleInputChange}

                            />
                        </div>
                        <ErrorMessage
                            name="email"
                            component={TextError}
                        />
                        <div >
                            <Field
                                name='password'
                                value={initValues.password}
                                type="password"
                                placeholder="Password"
                                autoComplete="current-password"
                                onChange={handleInputChange}

                            />
                        </div>
                        <ErrorMessage
                            name="password"
                            component={TextError}
                        />
                        <button
                            color="primary"
                            type="submit"
                        >
                            Login
                        </button>
                    </Form>
                </Formik>
            </div>
        );
    }
};

export default Login;
