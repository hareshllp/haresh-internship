import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { setCookie } from 'typescript-cookie';

import "bootstrap/dist/css/bootstrap.min.css";

import React, {useState} from 'react';
import {login} from "../services/auth.service";

type Props = {};

const validationSchema = () => {
  return Yup.object().shape({
    email: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });
}


const LoginComponent = (props: Props) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const navigate = useNavigate();

  const handleLogin = (formValue: { email: string; password: string }) => {
    const { email, password } = formValue;
    
    setLoading(true);
    
    login(email, password).then(
      response => {
        setCookie('authToken', response.data.session.accessToken);
        setCookie('loggedInUid', response.data.user.id);
        console.log(response.data.session.accessToken);
        navigate("/dashboard");
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        setMessage(resMessage);
      }
    );
  }

  return (
    <>
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <div className="card-container">

            <Formik
              initialValues={{email: '',password: ''}}
              validationSchema={validationSchema()}
              onSubmit={handleLogin}
            >
              <Form>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field name="email" type="text" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field name="password" type="password" className="form-control" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Login</span>
                  </button>
                </div>

                <div className="row">
                  <div className="col-md-8">
                    <div className="form-group">
                      <Link to="/forgotpassword" className="">
                        Forgot Password?
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      Click <Link to="/signup" className=""> here
                      </Link> to Sign Up
                    </div>
                  </div>
                </div>

                {message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  </div>
                )}
              </Form>
            </Formik>
          </div>
        </div>
        <div className="col-md-2"></div>
      </div>
    </>
  );

}

export default LoginComponent;