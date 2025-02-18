import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import {register} from "../services/auth.service";

const loader = require("../assets/images/loading.gif");

type Props = {};




const validationSchema = () =>{
  return Yup.object().shape({
    first_name: Yup.string().required("This field is required!"),
    last_name: Yup.string().required("This field is required!"),
    // username: Yup.string()
    //   .test(
    //     "len",
    //     "The username must be between 3 and 20 characters.",
    //     (val: any) =>
    //       val &&
    //       val.toString().length >= 3 &&
    //       val.toString().length <= 20
    //   )
    //   .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val: any) =>
          val &&
          val.toString().length >= 6 &&
          val.toString().length <= 40
      )
      .required("This field is required!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        "Password must have One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirm_password: Yup.string()
                  .oneOf([Yup.ref('password'), null], 'Password and Confirm Password must be same')            
                  .required("This field is required!"),   
    dob: Yup.string().required("This field is required!"),
    code: Yup.string().required("This field is required!"),
    phone_number: Yup.string().required("This field is required!"),
  });
}



const Register = (props:Props) => {
  
 
  const [message ,setMessage] = useState<string>('');
  const [successful ,setSuccessful] = useState<boolean>(false);
  const [isLoaderShow ,setIsLoaderShow] = useState<boolean>(false);
  
 

  const handleRegister = (formValue: {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    confirm_password: string,
    dob: string,
    code: string,
    phone_number: string,
  }) => {

    setIsLoaderShow(true);

    register(
      formValue.first_name,
      formValue.last_name,
      formValue.email,
      formValue.password,
      formValue.confirm_password,
      formValue.dob,
      formValue.code,
      formValue.phone_number,
    ).then(
      response => {
        setIsLoaderShow(false);
        setMessage("User Registered Successfully");
        setSuccessful(true);
      },
      error => {
        setSuccessful(false);
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          setIsLoaderShow(false);
          setMessage(resMessage);
          setSuccessful(false);
      }
    );
  }

  
  return (
      <>
        <div className="row">
          <div className="col-md-2"><div style={{ width: "100%" }}></div></div>
          <div className="col-md-8">
            <div className="card-container">
            
              <Formik
                initialValues={{first_name: "",last_name: "",email: "",password: "",confirm_password: "",dob: "",code: "",phone_number: ""}}
                validationSchema={validationSchema()}
                onSubmit={handleRegister}
              >
                <Form>
                  <div>
                    <div className="form-group">
                      <label htmlFor="first_name"> First Name </label>
                      <Field name="first_name" type="text" className="form-control" />
                      <ErrorMessage
                        name="first_name"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="last_name"> Last Name </label>
                      <Field name="last_name" type="text" className="form-control" />
                      <ErrorMessage
                        name="last_name"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email"> Email </label>
                      <Field name="email" type="email" className="form-control" />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password"> Password </label>
                      <Field
                        name="password"
                        type="password"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="confirm_password"> Confirm Password </label>
                      <Field
                        name="confirm_password"
                        type="password"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="confirm_password"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="dob"> Date Of Birth </label>
                      <Field name="dob" type="text" className="form-control" />
                      <ErrorMessage
                        name="dob"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="code"> Code </label>
                      <Field name="code" type="text" className="form-control" />
                      <ErrorMessage
                        name="code"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone_number"> Phone Number </label>
                      <Field name="phone_number" type="text" className="form-control" />
                      <ErrorMessage
                        name="phone_number"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <div className="form-group">
                      {isLoaderShow && (<div className="formLoader"><img src={loader} alt="image" /></div>)}
                      <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                    </div>
                  </div>

                  {message && (
                    <div className="form-group">
                      <div
                        className={
                          successful ? "alert alert-success" : "alert alert-danger"
                        }
                        role="alert"
                      >
                        {message}
                      </div>
                    </div>
                  )}
                </Form>
              </Formik>
            </div>
            <div className="col-md-6">
              Click <Link to="/login" className=""> here
              </Link> to Login
            </div>
          </div>
        </div>
      </>
  );
  
}

export default Register;