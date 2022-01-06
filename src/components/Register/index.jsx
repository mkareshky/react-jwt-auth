import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextError } from '../../helpers/TextError';
import { UserContext } from '../../contexts/UserContext';
import Login from '../Login';
import { registration } from '../../store/register/registerActions';
import { REGISTER_RESET } from '../../store/register/types';

const Register = () => {
    const dispatch = useDispatch();
    const [, setUser] = useContext(UserContext);
    const [loginPage, setLoginPage] = useState(false);
    const [success, setSuccess] = useState(false);
    const [initValues, setInitValues] = useState({
        email: '',
        password: '',
    });
    const userRegistration = useSelector((state) => state.userRegister);
    const { data: reduxData, loading: reduxIsLoading, error: reduxError } = userRegistration;
    const submitHandler = () => {
        dispatch(registration(initValues));
        setUser({
            email: initValues.email,
            password: initValues.password,
            jwtToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsIm5hbWUiOiJ0ZXN0IHVzZXIiLCJyb2xlIjoidXNlciJ9.wfK9bryPNt3UvYL9mm0L8X33oPk82xR75ycvCAAg8xY`
        });
        setSuccess(true);
        setInitValues({
            email: '',
            password: '',
        });
    };

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        setInitValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        dispatch({ type: REGISTER_RESET });
    }, [dispatch]);

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required("Password is required"),
    });
    if (loginPage) {
        return <Login />
    }
    else {
        return (
            <div >
                <button
                    color="primary"
                    type="submit"
                    onClick={() => setLoginPage(true)}
                >
                    Login
                </button>
                <Formik
                    validationSchema={validationSchema}
                    initialValues={initValues}
                    onSubmit={submitHandler}
                    enableReinitialize
                >
                    <Form>
                        <h1>Register</h1>
                        <p >Create an account</p>
                        {success &&
                            <p style={{ color: 'green' }}>
                                Your account successfully created in context
                            </p>
                        }
                        {reduxData &&
                            <p style={{ color: 'green' }}>
                                Data is successfully stored
                            </p>
                        }
                        {reduxError &&
                            <p style={{ color: 'red' }}>
                                There is no API to connect
                            </p>
                        }
                        {reduxIsLoading &&
                            <p style={{ color: 'red' }}>
                                Loading...
                            </p>
                        }
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
                            Register
                        </button>
                    </Form>
                </Formik>
            </div>
        );
    }

};

export default Register;
